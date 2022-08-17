"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const busboy_1 = __importDefault(require("busboy"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const data = new FormData();
// data.append("username", username);
// data.append("file", file);
function formData(preset) {
    return function (req, res, next) {
        let uploadingFile = false;
        let uploadingCount = 0;
        const done = () => {
            if (uploadingFile)
                return;
            if (uploadingCount > 0)
                return;
            next();
        };
        const bb = (0, busboy_1.default)({ headers: req.headers });
        req.body = {};
        //console.log("headers: ", req.headers);
        console.log("body: ", req.body);
        //Captura partes que no son un archivo
        bb.on("field", (key, val) => {
            req.body[key] = val;
        });
        //Captura partes que si son un archivo
        bb.on("file", (key, stream) => {
            uploadingFile = true;
            uploadingCount++;
            const cloud = cloudinary_1.default.v2.uploader.upload_stream({ upload_preset: preset }, (err, res) => {
                if (err)
                    throw new Error("Something went wrong!");
                //console.log("response cloudinary", res);
                req.body[key] = res;
                //console.log("Res.secure_URL:_", res.secure_url);
                uploadingFile = false;
                uploadingCount--;
                done();
            });
            stream.on("data", (data) => {
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
exports.default = formData;
//# sourceMappingURL=formData.js.map