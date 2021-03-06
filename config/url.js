import env from './env'

const DEV_URL = 'https://kangyonggan.com/'
const UAT_URL = 'http://localhost:8028/api/'
const PRO_URL = 'https://kangyonggan.com/api/'

export const domain = 'https://kangyonggan.com/'
export default env === 'development' ? DEV_URL : env === 'uat' ? UAT_URL : PRO_URL
