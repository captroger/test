import { serve } from "bun";

const BASE_DIR = "/home/team/shared/texttally";

const server = serve({
  port: 3001,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    
    // Default route
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    
    // Build file path
    const filePath = `${BASE_DIR}${path}`;
    const file = Bun.file(filePath);
    
    if (await file.exists()) {
      return new Response(file);
    }
    
    // Return 404 Not Found
    return new Response("404 Not Found", { 
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });
  },
});

console.log(`TextTally static server listening on http://0.0.0.0:3000`);
