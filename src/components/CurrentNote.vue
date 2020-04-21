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
                v-for="(todo, index) in cloneTodos" 
                :key="index"
                :class="todo.checked ? 'done' : ''"
              >
                <input type="checkbox"
                        v-model="todo.checked"
                        @click="todosGetChange()"
                >
                <p v-if="!todo.change"> {{todo.text}} </p>
                <input type="text"
                        v-else 
                        v-model="todo.text"
                >

                <div class="note-btn">
                  <button @click="removeTodo(index)">remove</button>
                  <button @click="editTodo(index)" 
                          v-if="!todo.change"
                  >
                    edit </button>
                  <button @click="saveTodo(index)" 
                          v-if="todo.change"
                  >
                  save </button>
                </div>
                
            </div>
        <div class="note-input">
          <input type="text"
                  v-model="newTodo"
                  placeholder="New Todo"
          >
          <button @click="addTodo()">add</button>
        </div>

        <button @click="saveChanges()">Save</button>
        <button @click="cancel()">Cancel</button>


        <br><hr>
        <button @click="removeNote()">Remove Note</button>

        </div>

      </div>
      <button @click="todosCancelChange()"> Cancel Change</button>
      <button @click="todosRepeat()"> Repeat Change</button>

      <!-- Модальное окно -->
      <modalWindow v-if="showModal" 
                    @agree=" modalChanges ? goHome() : confirmRemote()" 
                    @disagree="showModal = false"
      >
          <h3 slot="header" v-if="modalChanges">Changes</h3>
          <p slot="body" v-if="modalChanges">Do you really want to undo your changes?</p>
      </modalWindow>
  </div>
</template>

<script>
import modalWindow from './modalWindow'
var _ = require('lodash');
import { mapGetters } from 'vuex';

  export default {
    name: 'CurrentNote',
    components: {modalWindow},

    data() {
      return{
        noteTitle: this.$route.params.title,
        current: '', // id текущей заметки
        newTodo:'',
        newTitle:'',
        showModal: false,
        modalChanges: false,

        cloneTodos: [], //дубликат списка дел текущей заметки
        todosBeforChange:[], //х ранит состояние списка до изменения
        todosAfterChange: [],

      }
    },

    

    mounted() {
      //создаем дубликат списка дел todo
      this.cloneTodos = _.cloneDeep(this.currentTodos)
      this.todosAfterChange = _.cloneDeep(this.currentTodos)
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
      //список дел текущей заметки
      currentTodos() {
        return this.currentNote.todos
      },

    },
    
    methods: {
      // методы для сохранения состояния списка до изменения и после
      todosGetChange() {
        this.todosBeforChange = _.cloneDeep(this.cloneTodos)
      },
      todosGetRepeat() {
        this.todosAfterChange = _.cloneDeep(this.cloneTodos)
      },
      todosCancelChange() {
        this.cloneTodos = _.cloneDeep(this.todosBeforChange)
      },

      todosRepeat() {
        this.cloneTodos = _.cloneDeep(this.todosAfterChange)
      },


      editTodo(index) {
        this.todosGetChange()
        this.cloneTodos[index].change = !this.cloneTodos[index].change;
      },

      saveTodo(index) {
        this.cloneTodos[index].change = !this.cloneTodos[index].change;
        this.todosGetRepeat()
      },

      addTodo() {
        this.todosGetChange()
        if(this.newTodo != '') {
          this.cloneTodos.push({
            text: this.newTodo,
            checked:false,
            change: false
          }),
          this.newTodo= ''
        }
        this.todosGetRepeat()
      },

      removeTodo(index) {
        this.todosGetChange()
        this.cloneTodos.splice(index, 1)
        this.todosGetRepeat()
      },

      goHome() {
        this.$router.push({ name:'NotesList'});
      },

      saveChanges() {
        this.$store.dispatch({
          type: 'SAVE_CHANGES',
          id: this.current,
          title: this.noteTitle,
          todos: this.cloneTodos,
        })
        this.goHome()
      },

      cancel() {
        this.modalChanges = true;
        this.showModal = true;
      },

      confirmRemote() {
        this.$store.commit('REMOVE_NOTE', this.current)
        this.goHome()
      },

      removeNote() {
        this.showModal = true;
      },
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