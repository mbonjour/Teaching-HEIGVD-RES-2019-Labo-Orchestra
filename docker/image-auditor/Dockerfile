FROM node:4.3.1
MAINTAINER Mickael Bonjour <mickael.bonjour@heig-vd.ch>

EXPOSE 2205

#
# When we build the image, we copy the executable app in the image file system. 
#
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]