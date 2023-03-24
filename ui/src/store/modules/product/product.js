import crud from '../../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "products" ,
    title: "ផលិតផល" 
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
  async compact ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name + "/compact?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+'/read')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name+"/create",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/delete")
  },
  async checkName({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/name/exist?name="+params.name)
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(rootState.apiServer+"/"+state.model.name+'/compact',params)
  },
  async upload({ state, commit, rootState },formData) {
    return await crud.upload(rootState.apiServer+"/"+state.model.name+"/upload",formData)
  },
  async featurePicture ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/featurepicture",params)
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