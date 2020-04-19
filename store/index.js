import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate';
// import todos from './modules/toDos'
import notes from './modules/notes'


Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {

	},
	// plugins: [createPersistedState()],
  getters: {},
  mutations: {},
	actions: {},
	modules: {
		// todos,
		notes,
	}
});