// include dependencies
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors')

const options = {
  changeOrigin: true,
  ws: true,
};

const frontendProxy = createProxyMiddleware({ ...options, target: 'http://localhost:3000' });
const accauntingProxy = createProxyMiddleware({ ...options, target: 'http://localhost:4001' });
const analiticsProxy = createProxyMiddleware({ ...options, target: 'http://localhost:4002' });
const taskTrackerProxy = createProxyMiddleware({ ...options, target: 'http://localhost:4003' });
const authProxy = createProxyMiddleware({ ...options, target: 'http://localhost:4004' });

const app = express();

app.use(cors())

app.use("/api/v1/accaunting", accauntingProxy);
app.use("/api/v1/accaunting/*", accauntingProxy);
app.use("/api/v1/analitics/*", analiticsProxy);
app.use("/api/v1/tasks", taskTrackerProxy);
app.use("/api/v1/tasks/*", taskTrackerProxy);
app.use("/api/v1/auth", authProxy);
app.use("/api/v1/auth/*", authProxy);
app.use("/", frontendProxy);

app.listen(8080, '0.0.0.0', () => {
  console.log(`listening on http://localhost:8080`);
  const open = require('open');
  setTimeout(() => {
    open(`http://localhost:8080`);
  }, 5000)
});
