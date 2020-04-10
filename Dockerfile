FROM node:12.16.0
WORKDIR /srv
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date
ADD . .
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 500M
RUN pm2 set pm2-logrotate:retain 10
RUN npm install
EXPOSE 3001
CMD [ "pm2-runtime", "start","ecosystem.config.js"]