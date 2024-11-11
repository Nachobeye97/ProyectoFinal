import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api': {  // Asegúrate de que el proxy también incluye el prefijo de tu API.
                target: 'http://localhost:5000',  // Usa HTTP en lugar de HTTPS.
                changeOrigin: true,  // Asegura que el origen de la solicitud sea modificado para coincidir con el destino.
                secure: false
            }
        },
        port: 5174,
        https: false // HTTPS deshabilitado.
    }
});
