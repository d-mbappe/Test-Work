<template>
  <div>
      <div class="note"
            v-for="(note, index) in notesList"
            :key="note.id"
        >
        <div class="note-item"
              v-if="noteTitle == note.title"
              :current=" noteTitle == note.title ? current = index : ''"
          >
            <h2 class="note-title"> {{note.title}} </h2>

            <div class="note-todos"
                v-for="(todo, index) in note.todos"
                :key="index"
                :class="todo.checked ? 'done' : ''"
              >
                <input type="checkbox"
                        v-model="todo.checked"
                >
                <p v-if="!todo.change"> {{todo.text}} </p>
                <input type="text"
                        v-else 
                        v-model="todo.text"
                >

                <button>delete</button>

                <button @click="editTodo(index)"
                        v-if="!todo.change"
                >change
                </button>
                <button v-else
                        @click="saveTodo(index)"
                > save
                </button>
                
            </div>
        <div class="note-input">
          <input type="text"
                  v-model="newTodo"
          >
          <button @click="addTodo()">add</button>
        </div>

        </div>

      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    name: 'CurrentNote',

    data() {
      return{
        noteTitle: this.$route.params.title,
        current: '',
        newTodo:''
      }
    },

    computed: {
      notesList() {
        return this.$store.getters.NOTES;
      },

      // ...mapState({
      //   notesList: 'notes'
      // }),

      ...mapGetters([
            'CURRENT_NOTE'
        ]),

      currentNote() {
        
        return this.CURRENT_NOTE(this.current);

      }
    },
    
    methods: {

      editTodo(index) {
        this.currentNote.todos[index].change = !this.currentNote.todos[index].change;
      },

      addTodo: function() {
            this.currentNote.todos.push({
                text: this.newTodo,
                checked:false,
                change: false
            }),

            this.newTodo= ''
      },

      saveTodo(index) {
        // let key = this.current;
        this.currentNote.todos[index].change = !this.currentNote.todos[index].change;
        // this.$store.commit('SAVE_TODO', key, index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .note-todos {
    height: 50px;
    display: flex;
    align-items: center;

    margin: 10px;
    padding: 5px;

    border: 1px solid #ccc;
    border-radius: 30px;

      input {
        margin: 0 10px;
        &[type='text'] {
          width: 65%;
          padding: 10px;
        }
      }

      button {
        margin: 0 10px;
      }
  }

  .done {
    background-color: #8de98d;
  }
</style>