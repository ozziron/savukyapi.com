const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 4173;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = path.join(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=UTF-8'
};

function getFilePath(requestPath) {
  const parsedUrl = url.parse(requestPath);
  const sanitizedPath = path
    .normalize(parsedUrl.pathname)
    .replace(/^\/+/, '')
    .replace(/\.\.(\/|\\|$)/g, '');

  if (!sanitizedPath || sanitizedPath === '') {
    return path.join(ROOT, 'index.html');
  }

  return path.join(ROOT, sanitizedPath);
}

function sendFile(filePath, response) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return sendNotFound(response);
      }
      return sendServerError(response, err);
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      return sendFile(indexPath, response);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const stream = fs.createReadStream(filePath);
    stream.on('open', () => {
      response.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      sendServerError(response, streamErr);
    });
  });
}

function sendNotFound(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.end('404 - Sayfa bulunamadı');
}

function sendServerError(response, error) {
  response.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
  response.end('500 - Sunucu hatası\n' + error.message);
}

const server = http.createServer((request, response) => {
  const filePath = getFilePath(request.url);
  sendFile(filePath, response);
});

server.listen(PORT, HOST, () => {
  console.log(`Savuk Yapı sitesi http://${HOST}:${PORT} adresinde yayında`);
});
