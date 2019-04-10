RUN sleep 60
FROM node:8
WORKDIR /shyftplan-users
COPY package.json /shyftplan-users
RUN npm install
COPY . /shyftplan-users
CMD npm start
EXPOSE 8000
