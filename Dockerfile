FROM node:6.12.0-alpine

WORKDIR /app

COPY . /app

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install && npm cache clean

ENV http_proxy http://127.0.0.1:20172
ENV https_proxy http://127.0.0.1:20172
ENV TDL_PROXY http://127.0.0.1:20172

CMD ["npm", "start"]
