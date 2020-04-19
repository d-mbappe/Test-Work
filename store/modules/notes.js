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
      id: 2
    },

  ]
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
  // CURRENT_NOTE: (state, key) => {
  //   return state.notes[key]
  // },

  SAVE_TODO: (state, key, index) => {
    return state.notes[key].todos[index]
  }
}

export default {
  state,
  getters,
  mutations,
  // actions,
};