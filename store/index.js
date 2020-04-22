import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import notes from './modules/notes'


Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {

	},
	plugins: [createPersistedState()], //сохраняет изменения в localStorage
	
  getters: {},
  mutations: {},
	actions: {},
	modules: {
		notes,
	}
});
