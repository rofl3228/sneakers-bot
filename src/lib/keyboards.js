const { Markup } = require('telegraf');

module.exports.getMainKeyboard = (ctx) => {
    const mainKeyboardNew = ctx.i18n.t('keyboards.main.new');

    let mainKeyboard = Markup.keyboard([
        [mainKeyboardNew]
    ]).resize().extra();

    return {
        mainKeyboard,
        mainKeyboardNew,
    }
}