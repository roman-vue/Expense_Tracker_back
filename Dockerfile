FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
# Solo traemos los archivos de configuración
COPY --from=builder /app/package*.json ./
# Traemos la carpeta dist (el código ya compilado a JS)
COPY --from=builder /app/dist ./dist
# Instalamos SOLO las librerías necesarias para correr (sin devDependencies)
RUN npm install --only=production --force --legacy-peer-deps

EXPOSE 3032
# Ejecutamos con node directamente, no con npm start
CMD ["node", "dist/main.js"]