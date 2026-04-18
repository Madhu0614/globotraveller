import type { Context } from "@netlify/functions";

let cachedServer: any;

async function loadServer() {
  if (!cachedServer) {
    try {
      const { default: app } = await import("../../dist/server/index.js");
      cachedServer = app;
    } catch (error) {
      console.error("Failed to load server:", error);
      throw error;
    }
  }
  return cachedServer;
}

export default async (req: Request, context: Context) => {
  try {
    const app = await loadServer();

    // Forward the request to the TanStack Start server
    const response = await app.fetch(req);

    return response;
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
