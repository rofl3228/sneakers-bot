module.exports.saveToSession = (ctx, field, data) => {
    //TODO check fields and types
    ctx.session[field] = data;
};

module.exports.deleteFromSession = (ctx, field) => {
    //TODO check fields
    delete ctx.session[field];
};
