FROM node:latest
WORKDIR /app
COPY package.json .
COPY . . 
RUN npm install
RUN npm run build
EXPOSE 6000
CMD ["node","./dist/index.js"]
