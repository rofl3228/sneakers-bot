const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { User } = require('../../models/User');
const { saveToSession } = require('../../lib/session');
const { getMainKeyboard } = require('../../lib/keyboards');
const { saveImage } = require('./helpers');

const { leave } = Stage;
const add = new Scene('add');

add.enter(async (ctx) => {
    await ctx.reply(ctx.i18n.t('scenes.add.enter'));
});

add.leave(async (ctx) => {
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.start.leave'), mainKeyboard);
});

add.on('message', async (ctx) => {
    console.log(JSON.stringify(ctx.message, null, 4));
    let result = await saveImage(ctx);
    await ctx.reply(`message accepted with ${JSON.stringify(result)}`);
});

module.exports.addScene = add;