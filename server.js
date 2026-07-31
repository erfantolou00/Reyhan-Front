'use strict';

const http = require('http');
const next = require('next');

const dev = false;
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = Number(process.env.HTTP_PLATFORM_PORT || process.env.PORT || 3000);

const app = next({
  dev,
  hostname,
  port,
  dir: __dirname,
});

const handle = app.getRequestHandler();

process.on('uncaughtException', (error) => {
  console.error('[uncaughtException]', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

app.prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res).catch((error) => {
        console.error('[request error]', error);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        }
        res.end('Internal Server Error');
      });
    });

    server.listen(port, hostname, () => {
      console.log(`Next.js is running on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error('[startup error]', error);
    process.exit(1);
  });
