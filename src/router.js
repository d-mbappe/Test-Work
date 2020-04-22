import Vue from 'vue'
import VueRouter from 'vue-router'     

import NotesList from './components/NotesList.vue'
import CurrentNote from './components/CurrentNote.vue'
import NewNote from './components/NewNote.vue'

Vue.use(VueRouter)
const routes = [
	{ path: '/', name: 'NotesList', component: NotesList},
	{ path: '/current-note/:id/:title', name: 'CurrentNote', component: CurrentNote },
	{ path: '/new-note', name: 'NewNote', component: NewNote },
];

export default new VueRouter({
	mode: 'history',
	routes: routes
});