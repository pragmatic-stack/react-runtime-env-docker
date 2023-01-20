FROM node:alpine as builder
WORKDIR "/app"
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:1.19.7-alpine

COPY ./nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/build /usr/share/nginx/html
COPY docker/docker-entypoint.d/* /docker-entrypoint.d/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]


#https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/