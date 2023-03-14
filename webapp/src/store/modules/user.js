import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "users" ,
    title: "អ្នកប្រើប្រាស់" 
  },
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async list ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name,params)
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/authenticated",params)
  },
  async passwordChange ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/password/change",params)
  },
  async checkUsername({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/username/exist?username="+params.username)
  },
  async checkPhone({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/phone/exist?phone="+params.phone)
  },
  async checkEmail({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/email/exist?email="+params.email)
  },
  async signupConfirmation({ state, commit, rootState },params) {
    return await crud.put(rootState.apiServer+"/authentication/signup/activate",params)
  },
  async passwordForgot({ state, commit, rootState },params) {
    return await crud.put(rootState.apiServer+"/password/forgot",params)
  },
  async passwordForgotConfirmation({ state, commit, rootState },params) {
    return await crud.put(rootState.apiServer+"/password/forgot/confirm",params)
  },
  async passwordUpdate({ state, commit, rootState },params) {
    return await crud.put(rootState.apiServer+"/password/reset",params)
  },
  async upload({ state, commit, rootState },formData) {    
    return await crud.upload(rootState.apiServer+"/"+state.model.name+"/upload",formData)
  },
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}