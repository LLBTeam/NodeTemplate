FROM node:8.11.3-alpine

WORKDIR /opt/workspace
COPY . /opt/workspace
RUN npm i 

CMD [ "app"]