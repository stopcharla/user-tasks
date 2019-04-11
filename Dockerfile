FROM node:8
WORKDIR /shyftplan
COPY package.json /shyftplan
RUN npm install
COPY . /shyftplan
CMD npm start
EXPOSE 8000
