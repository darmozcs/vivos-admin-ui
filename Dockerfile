FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_API_BASE_URL=""
ARG VITE_API_ID=""
ARG VITE_ENABLE_MOCKS=false
ARG VITE_TOKEN_REFRESH_INTERVAL_MS=300000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL} \
    VITE_API_ID=${VITE_API_ID} \
    VITE_ENABLE_MOCKS=${VITE_ENABLE_MOCKS} \
    VITE_TOKEN_REFRESH_INTERVAL_MS=${VITE_TOKEN_REFRESH_INTERVAL_MS}
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
