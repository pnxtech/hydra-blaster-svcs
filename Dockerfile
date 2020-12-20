FROM node:12-alpine
LABEL maintainer="Carlos Justiniano cjus@ieee.org"
EXPOSE 80
HEALTHCHECK --start-period=10s --interval=30s --timeout=3s CMD curl -f http://localhost:80/v1/blaster/health || exit 1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN apk add --update curl && rm -rf /var/cache/apk/*
RUN npm install --production
ENTRYPOINT ["node", "index"]
