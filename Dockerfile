FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_APP_API_URL
ARG VITE_APP_GOOGLE_CLIENT_ID

ENV VITE_APP_API_URL=$VITE_APP_API_URL
ENV VITE_APP_GOOGLE_CLIENT_ID=$VITE_APP_GOOGLE_CLIENT_ID

RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]