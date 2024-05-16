import express from "express";
import cors from "cors";

// {
//   "name": "contains",
//     "id": "ef22e62c3fb0576d85af86dc6a815e3f"
// },
// {
//   "name": "doesn't contain",
//     "id": "91f797e1924ddfa31157b64bad449c6b"
// }

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "https://www.herodevs.com/",
      "https://herodevs.com/",
      "https://hero-devs-24601.webflow.io/",
    ],
  }),
);

app.get("/form-redirects", async (req, res) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.WEBFLOW_CRM_TOKEN}`,
      },
    };

    const rules = await fetch(
      "https://api.webflow.com/v2/collections/664621e4859f07541bec2c08/items",
      options,
    ).then((response) => response.json());
    res.send(
      rules.items.map((item) => ({
        ...item.fieldData,
        urlstring:
          item.fieldData.urlstring === "ef22e62c3fb0576d85af86dc6a815e3f"
            ? "contains"
            : "not-contains",
      })),
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(PORT, async () => {
  console.log(`App listening on port ${PORT}`);
});
