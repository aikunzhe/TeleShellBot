# TeleShellBot

A simple Telegram Bot to run shell commands remotely, so that you can maintain your server from mobile phones!
![demo](https://cdn.jsdelivr.net/gh/aikunzhe/TeleShellBot/screens/demo.gif)
![tdl](https://cdn.jsdelivr.net/gh/aikunzhe/TeleShellBot/screens/tdl.jpg)

# docker版本
1. 下载本项目
2. 修改config.js
    - [获取USER_ID](https://medium.com/@tabul8tor/how-to-find-your-telegram-user-id-6878d54acafa)
    - 创建一个机器人 [Telegram instructions](https://telegram.org/blog/bot-revolution)
3. ```docker build -t tgbot .```
4. 启动容器：
    - 三个代理地址可以不填写，只要保证自己的网络环境畅通
    - 最后一个映射可以不写，主要是为了调试方便
```
docker run -d \
  --restart=always \
  --privileged \
  --network=host \
  --name tgbot \
  -e http_proxy=0.0.0.0:2017 \
  -e https_proxy=0.0.0.0:2017 \
  -e TDL_PROXY=0.0.0.0:2017 \
  -v /宿主机/.tdl:/root/.tdl \
  -v /宿主机/downloads:/downloads \
  -v /本项目的路径:/app/exec \
  tgbot
```

# 普通版
## Install
Download or clone this repo, then
```
npm install
```
## Config
- Follow [Telegram instructions](https://telegram.org/blog/bot-revolution) to create a bot, and you will get bot token.
- [Find you user ID](https://medium.com/@tabul8tor/how-to-find-your-telegram-user-id-6878d54acafa)
- Then put your telegram user ID and bot token in `config.js`:
```javascript
module.exports = {
    config:function(){
        return (
            {
                adminUsers:[USER_ID], //admin users' telegram id, should be numbers
                botToken: 'YOUR_BOT_TOEKN', // bot token

            }
        );
    }
};
```
## Run
```
npm run start
```
or 
```
node index.js
```

That is it!
