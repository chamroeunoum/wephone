import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import client from './modules/client'
import loan from './modules/loan'
import people from './modules/people'
// import staff from './modules/staff'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    apiServer: 'http://127.0.0.1:8000/api/admin' ,
  },
  modules: {
    // product ,
    auth,
    user,
    client,
    loan,
    people,
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
