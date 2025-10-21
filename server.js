// server.js
import { createRequestHandler } from "@remix-run/node";
import * as build from "./build/server/index.js";
import express from "express";

const app = express();

// Shopify apps ke liye koi reverse proxy ya API forwarders hotay hain
// To ensure correct headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Remix request handler
app.all("*", createRequestHandler({ build }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
