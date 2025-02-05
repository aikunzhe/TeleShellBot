FROM node:6.12.0-alpine

WORKDIR /app

COPY . /app

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install && npm cache clean

ENV http_proxy http://127.0.0.1:20172
ENV https_proxy http://127.0.0.1:20172
ENV TDL_PROXY http://127.0.0.1:20172
ENV TDL_STORAGE {"type": "file", "path": "/root/.tdl/data.json"}


# 声明两个挂载点
VOLUME ["/root/.tdl", "/downloads"]

CMD ["npm", "start"]
