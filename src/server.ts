import dotenv from 'dotenv';
dotenv.config();
import app from './app';

function main() {
    const port = app.get('port');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}

main();