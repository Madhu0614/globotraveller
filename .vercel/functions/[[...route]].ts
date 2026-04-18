import { VercelRequest, VercelResponse } from "@vercel/node";

// Import the built server
let server: any;

async function loadServer() {
  if (!server) {
    try {
      // Load the TanStack Start server entry
      const { default: createServer } = await import("../../dist/server/index.js");
      server = createServer();
    } catch (error) {
      console.error("Failed to load server:", error);
      throw error;
    }
  }
  return server;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await loadServer();

    // Convert Vercel request to standard Request object
    const url = new URL(
      req.url || "/",
      `http://${req.headers.host || "localhost"}`
    );

    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    // Handle the request
    const response = await app.fetch(request);

    // Set response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Set status code
    res.status(response.status);

    // Send response body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
