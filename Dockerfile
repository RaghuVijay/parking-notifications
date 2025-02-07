FROM node:23-alpine

RUN mkdir services
WORKDIR services
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3003
CMD [ "npm run start:prod" ] 