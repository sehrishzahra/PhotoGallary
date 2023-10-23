const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app:any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cdn2.thecatapi.com',
      changeOrigin: true,
    })
  );
};