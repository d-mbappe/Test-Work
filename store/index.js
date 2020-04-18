import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/toDos'

Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {

	},
  getters: {},
  mutations: {},
	actions: {},
	modules: {
		todos,
	}
});