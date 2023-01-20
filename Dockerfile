FROM node:16.17.1-alpine as builder
WORKDIR "/app"
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.19-alpine

COPY ./nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/build /usr/share/nginx/html

# Add the script to write appConfig.js to the entrypoint
COPY docker/docker-entrypoint.d/set-env.sh /docker-entrypoint.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]