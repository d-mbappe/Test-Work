<template>
  <div>
    <div class="note"
          v-for="(note, index) in notesList"
          :key="note.id"
    >
      <div class="note-item"
            v-if="id == note.id"
            :current=" noteTitle == note.title ? current = index : ''"
      >
        <!-- Title -->
        <div class="note-title">
          <h2> {{note.title}} </h2>
        </div>
        <!-- Todos -->
        <div class="note-todos"
              v-for="(todo, index) in cloneTodos" 
              :key="index"
              :class="todo.checked ? 'done' : '' "
        >
          <input type="checkbox"
                  v-model="todo.checked"
                  @click="todosGetChange()"
          >
          <p v-if="!todo.change"> {{todo.text}} </p>
          <input type="text"
                  v-else 
                  v-model="todo.text"
                  @keyup.enter="editTodo(index)"
          >
        <!-- Buttons Todo -->
          <div class="note-btn">
            <button class="edit"
                    :disabled="todo.checked ? true : false" 
                    @click="editTodo(index)" 
                    v-if="!todo.change"
            >
              <font-awesome-icon icon="edit" />
            </button>
            <button class="edit" @click="saveTodo(index)" v-if="todo.change">
              Save <font-awesome-icon icon="check" />
            </button>
            <button class="remove" 
                      @click="removeTodo(index)" 
                      :disabled="todo.checked ? true : false" 
            >
              <font-awesome-icon icon="minus" />
            </button>
          </div>
        </div>
        <!-- Input -->
        <div class="note-input">
          <input type="text"
                  v-model="newTodo"
                  placeholder="New Todo"
                  @keyup.enter="addTodo()"
          >
          <button class="add" @click="addTodo()">                    
            <font-awesome-icon icon="plus" />
          </button>
        </div>
        <!-- Buttons Changes -->
          <div class="changes-btn">
            <button class="changes" @click="todosCancelChange()"> 
              <font-awesome-icon icon="arrow-left" />
            </button>
            <button class="changes" @click="todosRepeat()">
              <font-awesome-icon icon="arrow-right" />
            </button>
          </div>
        <!-- Note Buttons -->
        <button class="remove-note" @click="removeNote()">
            <font-awesome-icon icon="trash" />
        </button>

      </div>
    </div>

    <button class="add" @click="saveChanges()">
      Save
      <font-awesome-icon icon="save" />
    </button>
    <button class="remove" @click="cancel()">Cancel</button>

    <!-- Modal Window -->
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
        id: this.$route.params.id, 
        current: '', // id текущей заметки
        newTodo:'',
        newTitle:'',
        showModal: false,
        modalChanges: false,

        cloneTodos: [], //дубликат списка дел текущей заметки
        todosBeforChange:[], //хранит состояние списка до изменения
        todosAfterChange: [],//состояение после изменения

      }
    },

    mounted() {
      //создаем дубликат списка дел todo
      this.cloneTodos = _.cloneDeep(this.currentTodos)
      this.todosAfterChange = _.cloneDeep(this.cloneTodos)
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
        if (this.todosBeforChange.length !== 0) {
          this.cloneTodos = _.cloneDeep(this.todosBeforChange)
        }
      },

      todosRepeat() {
        this.cloneTodos = _.cloneDeep(this.todosAfterChange)
      },
      // 

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
        this.modalChanges = false;
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
  width: 80%;
  margin: 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;

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

.note-input {
  width: 100%;
  padding-top: 20px;
}

.note-btn {
  position: absolute;
  right: 0;
}

.changes-btn {
  width: 30%;
  height: 20%;
  position: relative;
  margin-left: auto ;
}

.done {
  background-color: #cacaca;
  color: #fff;
}

</style>