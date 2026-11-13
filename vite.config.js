import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import counsellingHandler from './api/counselling.js';
import enquiryHandler from './api/enquiry.js';

function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url === '/api/counselling' || url === '/api/enquiry') {
          let bodyData = '';
          req.on('data', chunk => {
            bodyData += chunk;
          });
          req.on('end', async () => {
            try {
              req.body = bodyData ? JSON.parse(bodyData) : {};
            } catch {
              req.body = bodyData;
            }

            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            const handler = url === '/api/counselling' ? counsellingHandler : enquiryHandler;
            try {
              await handler(req, res);
            } catch (err) {
              console.error('[vite-api-plugin] Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal server error in dev API' }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    apiDevPlugin()
  ],
});

