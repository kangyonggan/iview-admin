import env from './env'

const DEV_URL = 'https://kangyonggan.com/'
const UAT_URL = 'http://localhost:8027/'
const PRO_URL = 'https://kangyonggan.com/admin/'

export default env === 'development' ? DEV_URL : env === 'uat' ? UAT_URL : PRO_URL
