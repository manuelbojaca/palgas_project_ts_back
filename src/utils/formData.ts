import Busboy from "busboy";
import cloudinary from "cloudinary";
import {Request, Response, NextFunction} from "express";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const data = new FormData();
// data.append("username", username);
// data.append("file", file);

function formData(preset: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    let uploadingFile = false;
    let uploadingCount = 0;

    const done = () => {
      if (uploadingFile) return;
      if (uploadingCount > 0) return;
      next();
    };

    const bb = Busboy({ headers: req.headers });
    req.body = {};
    //console.log("headers: ", req.headers);
    console.log("body: ", req.body);
    //Captura partes que no son un archivo
    bb.on("field", (key: any, val: any) => {
      req.body[key] = val;

    });

    //Captura partes que si son un archivo
    bb.on("file", (key: any, stream: any) => {
      uploadingFile = true;
      uploadingCount++;

      const cloud = cloudinary.v2.uploader.upload_stream(
        { upload_preset: preset },
        (err, res) => {
          if (err) throw new Error("Something went wrong!");

          //console.log("response cloudinary", res);
          req.body[key] = res;
          //console.log("Res.secure_URL:_", res.secure_url);
          uploadingFile = false;
          uploadingCount--;
          done();
        }
      );

      stream.on("data", (data: any) => {
        //console.log(data);
        cloud.write(data);
      });

      stream.on("end", () => {
        //console.log("finish");
        cloud.end();
      });
    });

    //Finalizar el recepcion de datos
    bb.on("finish", () => {
      //next();
      done();
    });

    req.pipe(bb);
  };
}

export default formData;