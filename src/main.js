import Telegram from 'node-telegram-bot-api';
import config from 'config';

const admins = ['830255143'];

const bot = new Telegram(config.get('TG_API_KEY'), { polling: true });

const commands = [
  {
    command: 'start',
    description: 'Запуск бота',
  },
];

bot.setMyCommands(commands);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    keyboard: [[{ text: 'Добавить продукт' }]],
    one_time_keyboard: true,
  };

  const options = {
    reply_markup: JSON.stringify(keyboard),
  };

  bot.sendMessage(chatId, 'Добро пожаловать! Выберите действие:', options);
});

// можно подключить mongo для хранения поставщиков и их информации о товарах

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // для разделения интерфейса для владельца и клиентов нужно сверять id пользователя.

  if (text === 'Добавить продукт') {
    // для того что бы последовательно задвать вопросы о том что внести "им товара" или цену, нужно хранить текущий вопрос в состоянии. Реализовать состояние.
  }
});

// function getUsersKeyboard(selectedUsers) {
//   return users.map((user) => {
//     const userId = user.id;
//     const userName = user.name;
//     const isChecked = selectedUsers[userId] ? '✅' : '❌';
//     return [{ text: `${isChecked} ${userName}`, callback_data: `toggle_user_${userId}` }];
//   });
// }

bot.on('polling_error', (error) => {
  console.log(error.code); // => 'EFATAL'
});
