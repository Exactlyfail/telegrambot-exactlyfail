const { Telegraf, Markup } = require('telegraf');
require('dotenv').config() // для подключенія модуля dotenv. config - для запуска цієї функції щоб воспользуватися цим модулем process.env.BOT_TOKEN
const text = require('./const') // імпорт модуля константи

const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.start((ctx) => ctx.reply('Welcome')); // тут стрелочна функція. ctx- це контекст      ctx.reply - це оправка повідомлення ('Welcome') - і в дужках вказується текст
//bot.start((ctx) => console.log(ctx.message)) // при старті появляється інфорамія о пользувателі
bot.start((ctx) => ctx.reply(`Привіт ${ctx.message.from.first_name ? ctx.message.from.first_name : 'додік без імені'}!`));
bot.help((ctx) => ctx.reply(text.commands));

// обработка команд
bot.command('course', async (ctx)=>{
    try{

        await ctx.replyWithHTML('<b>Жопа</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Рудактори', 'btn_1'), 
                Markup.button.callback('Обзори', 'btn_2')]
            ]
        ))

    } catch(e) {
      console.error(e)
    }
})

// обработка кнопок btn_1, btn_2
function addActionBot(name, src, text) {
    bot.action(name, async (ctx)=>{
        try{
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src 
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true // оправка силки без иконки
            })
    
        } catch(e) {
          console.error(e)
        }
    })
}
// цю функцію треба визвать для любой кнопки 
addActionBot('btn_1', './img/1.jpg', text.text)


//bot.help((ctx) => ctx.reply('Send me a sticker')); // bot.help - це визов метода за допомогою /help - виводиться повідомлення ('Send me a sticker') - оправь мені стікер
// bot.on('sticker', (ctx) => ctx.reply('👍')); // оправка повідомлення на стикер

//bot.hears('hi', (ctx) => ctx.reply('Hey there')); // bot.hears - функція яка відстежує любой текст і відправляє на це повідомленяя відповість соотвествений текст

bot.launch(); // bot.launch(); - просто запускає бота

// Enable graceful stop - ці дві строки необходіми які не трогаєм і оставляєм як є
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));