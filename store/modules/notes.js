import Vue from 'vue'

const state = {
  notes: [
    { title:'home',
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

  current: '',
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
  ADD_NOTE: (statem, title) => {
    state.notes.push({
      title: title,
      todos: [],
      id: state.notes.length
    })
  },


  SAVE_CHANGES: (state, note) => {
    Vue.set(state.notes, 'title', note.title)
    Vue.set(state.notes, 'todos', note.todos)
  },

  REMOVE_NOTE: (state, id) => {
    state.notes.splice(id, 1)
  },
}

export default {
  state,
  getters,
  mutations,
  // actions,
};