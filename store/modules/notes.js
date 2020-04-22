import Vue from 'vue'

const state = {
  notes: [
    { title:'1',
      todos: [
        {text:'First - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
        {text:'Second - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
        {text:'Third - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
      ],
      id: 0
    },

    { title:'2',
      todos: [
        {text:'First - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
        {text:'Second - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
        {text:'Third - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
      ],
      id: 1
    },

    { title:'3',
      todos: [
        {text:'First - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
        {text:'Second - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
        {text:'Third - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checked: false, change: false},
      ],
      id: 2,
    }
  ],
};

const getters = {
  NOTES: state => {
    return state.notes;
  },

  CURRENT_NOTE: (state) => (id) => {
    return state.notes[id]
  },
};

const mutations = {
  NEW_NOTE: (state, title) => {
    state.notes.push({
      title: title,
      todos: [],
      id: state.notes.length
    })
  },

  SET_DATA: (state, payload) => {
    Vue.set(state.notes[payload.id], 'id', payload.id)
    Vue.set(state.notes[payload.id], 'title', payload.title)
    Vue.set(state.notes[payload.id], 'todos', payload.todos)
  },

  REMOVE_NOTE: (state, id) => {
    state.notes.splice(id, 1)
  },
};

const actions = {
  SAVE_CHANGES: ({commit, state}, payload) => {
    delete  state.notes[payload.id].title;
    delete  state.notes[payload.id].todos;
    delete  state.notes[payload.id].id;
    commit('SET_DATA', payload)
  },

  ADD_NOTE: ({commit, state}, payload) => {
    state.notes.push({})
    commit('SET_DATA', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
};