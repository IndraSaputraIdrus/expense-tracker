import app from "./app"

const server = Bun.serve({
  // port: 8080, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  // hostname: "mydomain.com", // defaults to "0.0.0.0"
  fetch: app.fetch
});

console.log("Server running on port:", server.port)

