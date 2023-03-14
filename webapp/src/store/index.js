import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import regulator from './modules/regulator'
import folder from './modules/folder'
// import client from './modules/client'
// import staff from './modules/staff'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    apiServer: 'http://127.0.0.1:8000/api/webapp' ,
    // branch: ''
  },
  modules: {
    // product ,
    auth,
    user,
    // client,
    // staff
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})