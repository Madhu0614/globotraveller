import type { IncomingMessage, ServerResponse } from "http";

let cachedServer: any;

async function getServer() {
  if (!cachedServer) {
    try {
      const startApp = (await import("../../dist/server/index.js")).default;
      cachedServer = startApp;
    } catch (error) {
      console.error("Failed to load server:", error);
      throw error;
    }
  }
  return cachedServer;
}

export default async function handler(
  req: IncomingMessage & { query?: Record<string, string | string[]>; body?: any },
  res: ServerResponse
) {
  try {
    const app = await getServer();

    // Construct full URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const url = new URL(req.url || "/", baseUrl);

    // Create a Request object compatible with TanStack Start
    const request = new Request(url.toString(), {
      method: req.method || "GET",
      headers: new Headers(
        Object.entries(req.headers)
          .filter(([key]) => key !== "host")
          .map(([k, v]) => [k, String(v)])
      ),
      body:
        req.method && ["GET", "HEAD"].includes(req.method)
          ? undefined
          : req.body
          ? typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
    });

    // Call the TanStack Start handler
    const response = await app.fetch(request);

    // Forward response status and headers
    res.statusCode = response.status;

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    // Stream the response body
    if (response.body) {
      const reader = response.body.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(Buffer.from(value));
        }
        res.end();
      } catch (error) {
        console.error("Error reading response body:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error processing response" }));
      }
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      })
    );
  }
}
