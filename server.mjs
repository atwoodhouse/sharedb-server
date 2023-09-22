import http from "http";
import express from "express";
import ShareDB from "sharedb";
import { WebSocketServer } from "ws";
import WebSocketJSONStream from "@teamwork/websocket-json-stream";
import json1 from "ot-json1";

ShareDB.types.register(json1.type);
const backend = new ShareDB();

function startServer() {
  const app = express();
  app.use(express.static("static"));
  const server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(1337);
  console.log('Listening on port 1337');
}

startServer();
