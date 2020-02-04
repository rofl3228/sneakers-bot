const mongoose = require('mongoose');
const Telegraf = require('telegraf');
const { session, Stage } = require('telegraf');
const TelegrafI18n = require( 'telegraf-i18n');
const { match } = require('telegraf-i18n');
const path = require('path');

const { asyncWrapper } = require('./lib/errorHandler');
global.logger = require('simple-node-logger').createSimpleFileLogger('./log/bot.log');
const config = require('./lib/helper').readConfig();

const { startScene } = require('./controllers/start/index');
const { addScene } = require('./controllers/add/index');

mongoose.connect(`mongodb://${config.mongo.user}:${config.mongo.pwd}@${config.mongo.host}/${config.mongo.db}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
});

mongoose.connection.on('error', err => {
    console.log(err);
    logger.error(
        `Error occurred during an attempt to establish connection with the database: %O`,
        err
    );
    process.exit(1);
});

mongoose.connection.on('open', () => {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const stage = new Stage([
        startScene,
        addScene,
    ]);
    const i18n = new TelegrafI18n({
        defaultLanguage: 'ru',
        directory: path.resolve(__dirname, 'locales'),
        useSession: true,
        allowMissing: false,
        sessionName: 'session'
    });

    bot.use(session());
    bot.use(i18n.middleware());
    bot.use(stage.middleware());

    bot.start(asyncWrapper(async (ctx) => ctx.scene.enter('start')));

    bot.hears(
        match('keyboards.main.new'),
        asyncWrapper(async (ctx) => await ctx.scene.enter('add'))
    );

    bot.catch((error) => {
        logger.error('Global error has happened, %O', error);
    });

    bot.startPolling();
});