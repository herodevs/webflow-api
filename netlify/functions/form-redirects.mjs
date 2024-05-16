export default async (req, context) => {
  try {
    const WEBFLOW_CRM_TOKEN = Netlify.env.get("WEBFLOW_CRM_TOKEN");
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

    const res = new Response();
    const corsWhitelist = [
      "http://localhost:3000",
      "http://localhost:4200",
      "https://www.herodevs.com/",
      "https://herodevs.com/",
      "https://hero-devs-24601.webflow.io/",
    ];
    if (corsWhitelist.indexOf(req.headers.origin) > -1) {
      res.headers.append("Access-Control-Allow-Origin", req.headers.origin);
      res.headers.append("Access-Control-Allow-Headers", "*");
      res.headers.append("Access-Control-Allow-Methods", "*");
    }

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
};
