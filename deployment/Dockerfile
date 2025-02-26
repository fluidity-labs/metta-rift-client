# Stage 1: Build the React app
FROM node:20-alpine AS builder

RUN apk add --no-cache gzip
WORKDIR /app
COPY ../package.json package-lock.json ./
RUN npm ci
COPY .. .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:1.25-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]