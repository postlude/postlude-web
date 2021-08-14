FROM node:14

RUN apt-get update \
    && apt-get install -y nginx

COPY ./nginx.conf /etc/nginx/sites-available/postlude-web.conf

RUN rm -f /etc/nginx/sites-enabled/default \
    && ln -s /etc/nginx/sites-available/postlude-web.conf /etc/nginx/sites-enabled

ENV SERVER_HOME /usr/share/nginx/html

COPY . /tmp/postlude-web

RUN cd /tmp/postlude-web \
    && npm install \
    && npx vue-cli-service build --mode production \
    && mv -f /tmp/postlude-web/dist/* $SERVER_HOME \
    && rm -rf /tmp/*

WORKDIR $SERVER_HOME

CMD ["nginx", "-g", "daemon off;"]
