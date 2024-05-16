import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export default function expressApp() {
  const app = express();
  const router = express.Router();
  const routerBasePath = `/api`;
  const WEBFLOW_CRM_TOKEN = process.env.WEBFLOW_CRM_TOKEN;

  // origins that are allowed to call the function if it is used outside of netlify team
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4200",
    "http://localhost:8000",
    "https://www.herodevs.com/",
    "https://herodevs.com/",
    "https://hero-devs-24601.webflow.io/",
  ];

  // check origin
  var corsOptions = {
    origin: (origin, callback) => {
      // No origin means request from the browser
      if (!origin) {
        callback(null, true);
      }
      if (
        process.env.NETLIFY_DEV === "true" ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    optionsSuccessStatus: 200,
  };

  router.use(cors(corsOptions));

  router.get("/form-redirects", async (req, res) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${WEBFLOW_CRM_TOKEN}`,
        },
      };

      const rules = await fetch(
        "https://api.webflow.com/v2/collections/664621e4859f07541bec2c08/items",
        options,
      ).then((response) => response.json());

      return res.json(
        rules.items.map((item) => ({
          ...item.fieldData,
          urlstring:
            item.fieldData.urlstring === "ef22e62c3fb0576d85af86dc6a815e3f"
              ? "contains"
              : "not-contains",
        })),
      );
    } catch (err) {
      return Response.json(JSON.stringify(err), { status: 500 });
    }
  });

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  app.use(routerBasePath, router);

  return app;
}
