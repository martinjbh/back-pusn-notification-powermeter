
const webpush = require('web-push');

let PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY
let PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY

webpush.setVapidDetails(
    'mailto:testingbarreiro@gmail.com',
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
);

module.exports = webpush