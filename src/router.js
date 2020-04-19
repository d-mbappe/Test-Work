import Vue from 'vue'
import VueRouter from 'vue-router'     


import NotesList from './components/NotesList.vue'
import CurrentNote from './components/CurrentNote.vue'
// import NotFound from './views/NotFound.vue'


Vue.use(VueRouter)
const routes = [
	{ path: '/', name: 'NotesList', component: NotesList},
	{ path: '/current-note/:title', name: 'CurrentNote', component: CurrentNote },

	// { path: '*', component: NotFound }
];

export default new VueRouter({
	mode: 'history',
	routes: routes
});