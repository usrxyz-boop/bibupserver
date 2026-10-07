const express = require("express");
const app = express();
app.use(express.json());

const TOKEN = process.env.TOKEN || "rahasia123";
let current = null;

app.post("/api/server", (req, res) => {
  const { server, port, token } = req.body || {};
  if (token !== TOKEN) return res.status(401).json({ ok: false, error: "unauthorized" });
  if (!server) return res.status(400).json({ ok: false, error: "server required" });

  current = { server, port: port ?? null, ts: Date.now() };
  console.log("Server baru:", current);
  res.json({ ok: true, data: current });
});

app.get("/api/server", (req, res) => {
  if (!current) return res.status(404).json({ ok: false, error: "belum ada server" });
  res.json({ ok: true, ...current });
});

app.get("/", (req, res) => res.send("API jalan"));

app.listen(process.env.PORT || 3000, () => console.log("Web API jalan"));