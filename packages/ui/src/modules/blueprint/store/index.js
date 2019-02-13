import actions from './actions'
import state from './state'
import getters from './getters'
import mutations from './mutations'
// TODO - this won't work with the current blueprint collection
import collectionModule from '@codotype/ui/src/store/lib/collectionModule'
const namespaced = true

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
  modules: {
    schema: collectionModule({ NEW_MODEL: { label: '' } })
  }
}
