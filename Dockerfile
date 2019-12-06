FROM node:8.16.2
WORKDIR /srv
ADD . .
RUN npm install pm2 -g
RUN npm install
EXPOSE 3001
CMD [ "pm2-runtime", "start","ecosystem.config.js" ]
