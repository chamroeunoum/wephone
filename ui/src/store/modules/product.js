import crud from '../../api/crud'

// initial state
const state = () => ({
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
    return await crud.list(rootState.apiServer+"/package",params)
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/package/"+params.id)
  },
  async get ({ state, commit, rootState },params) {
    return await crud.get(rootState.apiServer+"/package/"+params.id+'/public')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/package/create",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/package/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/package/"+params.id)
  }
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