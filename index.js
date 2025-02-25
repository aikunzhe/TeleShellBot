const TeleBot = require('telebot');
const { spawn } = require('child_process');

const config = require('./config').config();
const { adminUsers } = config;

const bot = new TeleBot(config.botToken);
bot.on('text', (msg) => {
  const { id } = msg.from;
  msg.reply.text('$:' + msg.text);
  if (!adminUsers.includes(id)) {
    msg.reply.text('You are not admin!');
    return;
  }

  if(msg.text.startsWith('https://t.me')){
    tmp = msg.text.split(' ');
    //拼接出原始路径 ./tdl dl -u https://t.me/xxxxxxx -d /download/xxxxxx --reconnect-timeout 0
    msg.text = './tdl dl -u '+tmp[0]+' -d /download/'+tmp[1]+' --reconnect-timeout 0';
  }

  const words = msg.text.split(' ');
  const len = words.length;
  let args = [];
  if (len > 1) {
    args = words.slice(1, len);
  }

  console.log('msg.text(整体命令):' + msg.text);

  const shell = spawn(words[0], args).on('error', (err) => {
    msg.reply.text('error while executing:' + words[0]);
    msg.reply.text(err);
  });

  if (shell) {
    shell.stdout.on('data', (data) => {
      msg.reply.text(`stdout:\n ${data}`);
    });

    shell.stderr.on('data', (data) => {
      msg.reply.text(`stderr: ${data}`);
    });

    shell.on('close', (code) => {
      msg.reply.text(`shell exited with code ${code}`);
    });
  }
});

bot.start();
