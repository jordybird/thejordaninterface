const express = require('express');
const session = require('express-session');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Set up express-session middleware
  server.use(
    session({
      secret: 'some secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set `true` if using HTTPS
    })
  );

  // Handle all Next.js routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001')
  });
});
