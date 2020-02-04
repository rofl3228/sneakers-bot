const axios = require('axios');
const fs = require('fs');

module.exports.saveImage = async (ctx) => {
    let imgId = ctx.message.photo[1].file_id;
    let filePath = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=${imgId}`).then((res) => {
        return res.data.result.file_path;
    }).catch((error) => {
        throw error;
    });
    let url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    let image_path = `./imgs/${ctx.from.id}-${imgId}.jpg`;
    await axios({
        url,
        responseType: 'stream',
        }).then(
        response =>
            new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(image_path))
                .on('finish', () => resolve())
                .on('error', e => reject(e));
        })
    );    

    return image_path;
}
