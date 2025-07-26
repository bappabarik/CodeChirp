import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import conf from './conf/conf'

const firebaseConfig = {
  apiKey: conf.firebaseApiKey,
  authDomain: conf.firebaseAuthDomain,
  projectId: conf.firebaseProjectId,
  messagingSenderId: conf.firebaseMessagingSenderId,
  appId: conf.firebaseAppId
}


const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export { messaging, getToken, onMessage }

// BMeiuRyGjMDP1YasCfDk6K-ki2lmmTeUwfUIpVniC2XJfTMxay4f37saeAkCW2M7f49eb3_adAjfopbKrAEBpOo

