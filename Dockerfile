# RapiTi - Comparador de Precios Locales
FROM node:20-alpine

LABEL maintainer="Equipo 6 - RapiTi"
LABEL description="Aplicación web para comparar precios de productos en tiendas locales"

WORKDIR /app
COPY package*.json ./
RUN if [ -f package.json ]; then npm install; fi
COPY . .
EXPOSE 3000
CMD ["node", "--version"]
