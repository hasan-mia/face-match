module.exports.API_PREFIX = process.env.API_PREFIX || '/face-match'
module.exports.PORT = process.env.PORT || 5000
module.exports.SOCKET_PORT = process.env.SOCKET_PORT || 6000
module.exports.MONGO_URI =
  process.env.NODE_ENV == 'production'
    ? process.env.MONGO_URI
    : 'XXXX'

module.exports.JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : 'XXXX'
module.exports.JWT_EXPIRE = process.env.JWT_EXPIRE
  ? process.env.JWT_EXPIRE
  : '30d'
module.exports.COOKIE_EXPIRE = process.env.COOKIE_EXPIRE
  ? process.env.COOKIE_EXPIRE
  : '2'

module.exports.SMPT_SERVICE = process.env.SMPT_SERVICE
  ? process.env.SMPT_SERVICE
  : 'gmail'
module.exports.SMPT_HOST = process.env.SMPT_HOST
  ? process.env.SMPT_HOST
  : 'smtp.gmail.com'
module.exports.SMPT_PORT = process.env.SMPT_PORT ? process.env.SMPT_PORT : '465'
module.exports.SMPT_MAIL = process.env.SMPT_MAIL
  ? process.env.SMPT_MAIL
  : 'example@gmail.com'
module.exports.SMPT_PASSWORD = process.env.SMPT_PASSWORD
  ? process.env.SMPT_PASSWORD
  : 'password'

module.exports.REDIS_HOST =
  process.env.REDIS_HOST ||
  'XXXX'
module.exports.REDIS_PORT = process.env.REDIS_PORT || 12780
module.exports.REDIS_PASS =
  process.env.REDIS_PASS || 'XXXX'
module.exports.MAX_RETRIES = process.env.MAX_RETRIES || 3
module.exports.RETRY_DELAY = process.env.RETRY_DELAY || 20 * 60 * 1000

module.exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || 'XXXX'
module.exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || 'XXXX'
module.exports.AWS_REGION = process.env.AWS_REGION || 'XXXX'
module.exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'XXXX'
