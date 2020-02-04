const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { User } = require('../../models/User');
const { saveToSession } = require('../../lib/session');
const { getMainKeyboard } = require('../../lib/keyboards');

const { leave } = Stage;
const start = new Scene('start');

start.enter(async (ctx) => {
    const uid = String(ctx.from.id);
    const user = await User.findById(uid);
    if (user) {
        await ctx.reply(ctx.i18n.t('scenes.start.back'));
        saveToSession(ctx, 'language', user.language);
        ctx.scene.leave();
    } else {
        const now = new Date().getTime();

        const newUser = new User({
            _id: uid,
            created: now,
            language: 'ru'
        });

        await newUser.save();
        await ctx.scene.leave()
    }
});

start.leave(async (ctx) => {
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.start.leave'), mainKeyboard);
});

module.exports.startScene = start;