import serverless from "serverless-http";
import expressApp from "./app/app.mjs";

const app = expressApp();
exports.handler = serverless(app);
