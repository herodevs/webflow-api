import serverless from "serverless-http";
import expressApp from "./app";

const app = expressApp();
exports.handler = serverless(app);
