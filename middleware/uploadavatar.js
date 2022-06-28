let multer = require('multer');
let storage = multer.diskStorage({
    // 'dest': 'images',
    destination: './assets/avatar/',
    fileFilter(req, file, cb) {
        if (!file.mimetype.match(/png|jpg|jpeg$/)) {
            cb(new Error('file must be png , jpg or jpeg'))
        }
        cb(undefined, true);
    },
    filename: function(req, file, cb) {
        const extension = '.' + file.mimetype.slice(file.mimetype.indexOf('/') + 1, (file.mimetype.length));
        cb(null, Date.now() + extension);
    }
})
var upload = multer({ storage: storage });

module.exports = upload;