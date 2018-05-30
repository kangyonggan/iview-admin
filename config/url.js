import env from './env'

const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
const UAT_URL = 'http://localhost:8027/'
const PRO_URL = 'http://kangyonggan/'

export default env === 'development' ? DEV_URL : env === 'uat' ? UAT_URL : PRO_URL
