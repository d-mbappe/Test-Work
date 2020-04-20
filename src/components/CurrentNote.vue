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
            <div class="note-title">
              <h2> {{note.title}} </h2>
            </div>

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

                <div class="note-btn">
                  <button @click="removeTodo(index)">remove</button>
                  <button @click="editTodo(index)">
                    {{todo.change ? 'save' : 'change'}}
                  </button>
                </div>
                
            </div>
        <div class="note-input">
          <input type="text"
                  v-model="newTodo"
          >
          <button @click="addTodo()">add</button>
        </div>

        <button @click="saveChanges()">Save Note</button>
        <br>
        <button @click="removeNote()">Remove Note</button>

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
        current: '', // id текущей заметки
        newTodo:'',
        newTitle:''
      }
    },

    computed: {
      //массив заметок
      notesList() {
        return this.$store.getters.NOTES;
      },

      ...mapGetters([
            'CURRENT_NOTE',
        ]),
      //текущая заметка
      currentNote() {
        return this.CURRENT_NOTE(this.current);
      },

    },
    
    methods: {

      editTodo(index) {
        this.currentNote.todos[index].change = !this.currentNote.todos[index].change;
      },

      addTodo() {
        if(this.newTodo != '') {
          this.currentNote.todos.push({
            text: this.newTodo,
            checked:false,
            change: false
          }),
          this.newTodo= ''
        }
        
      },

      removeTodo(index) {
        this.currentNote.todos.splice(index, 1)
      },

      changeTitle() {
        this.newTitle = '.'
        this.$store.commit('CHANGE_TITLE', this.current, this.newTitle)
      },

      saveChanges() {
        this.$store.commit('SAVE_CHANGES', this.currentNote)
        this.$router.push({ name:'NotesList'});
      },

      removeNote() {
        this.$store.commit('REMOVE_NOTE', this.current)
        this.$router.push({ name:'NotesList'});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .note-title {
    display: flex;
    justify-content: center;
    align-items: baseline;

    & button {
      margin-left: 5px;
      height: 25px;
    }
  }

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