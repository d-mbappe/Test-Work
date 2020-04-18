const state = {
  todos: [
      {text:'First - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checkedTask: false, changeTask: false},
      {text:'Second - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checkedTask: false, changeTask: false},
      {text:'Third - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checkedTask: false, changeTask: false},
    ],
  styleObject: {
      'text-decoration': 'line-through',
      opacity: '.7'
  },
  newTask:'',
  changeTask: false,
  };
  
  const getters = {
    TODOS: state => {
      return state.todos;
    },
  };
  
  const mutations = {
    DELETE_TODO: (state, index) => {
      state.todos.splice(index, 1)
    },
  
    ADD_TODO: (state, payload) => {
      state.todos.push(payload);
    },
  };
  
  const actions = {
    // GET_TODO: async (context, payload) => {
    // context.commit('SET_TODO', data);
    // },
  
    // SAVE_TODO: async (context, payload) => {
    //   context.commit('ADD_TODO', payload);
    // },
  };
  
  export default {
    state,
    getters,
    mutations,
    actions,
  };