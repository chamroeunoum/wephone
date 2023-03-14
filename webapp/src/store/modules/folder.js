import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "folders" ,
    title: "ថតឯកសារ" 
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
    return await crud.list(
      rootState.apiServer+"/"+state.model.name + "?" + new URLSearchParams({
        // unit: params.unit ,
        // date: params.date ,
        // number: params.number ,
        // type: params.type ,
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString(),
      null,
      true
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/"+params.id+"/read")
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(rootState.apiServer+"/"+state.model.name,params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name,params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(rootState.apiServer+"/"+state.model.name,params)
  },
  async regulators ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/regulators"+ "?" + new URLSearchParams({
      folder_id: params.id ,
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async addRegulator ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/regulators/add",params)
  },
  async removeRegulator ({ state, commit, rootState },params) {
    return await crud.update(rootState.apiServer+"/"+state.model.name+"/regulators/remove",params)
  },
  async ofUser ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/user"+ "?" + new URLSearchParams({
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async listDocumentWithValidation ({ state, commit, rootState },params) {
    return await crud.read(rootState.apiServer+"/"+state.model.name+"/list/document/validation"+ "?" + new URLSearchParams({
      search: params.search ,
      perPage: params.perPage ,
      page: params.page ,
      document_id : params.document_id
    }).toString(),
    null,
    true
  )},
}

// mutations
const mutations = {

  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}