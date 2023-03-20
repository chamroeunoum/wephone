import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import client from './modules/client'
import loan from './modules/loan'
import people from './modules/people'
// import staff from './modules/staff'
/**
 * Product store module
 */
import attribute from './modules/product/attribute'
import variant from './modules/product/variant'
import attributevariant from './modules/product/attributevariant'
import unit from './modules/product/unit'
import unitconvention from './modules/product/unitconvention'
import product from './modules/product/product'
import stock from './modules/product/stock'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    apiServer: 'http://127.0.0.1:8000/api/admin' ,
    // apiServer: 'http://wephoneapi.sctthaicambodia.com/api/admin'
  },
  modules: {
    // product ,
    auth,
    user,
    client,
    loan,
    people,
    // staff ,
    // Product modules
    attribute ,
    variant ,
    attributevariant ,
    unit ,
    unitconvention ,
    product ,
    stock
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})
