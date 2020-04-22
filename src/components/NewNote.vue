<template>
  <div>
    <h2>New Note</h2>

    <div class="note-item">
      <!-- Title -->
      <div v-if="!changeTitle" class="hide-title">
        <input type="text" 
                placeholder="Title"
                v-model="newTitle"
                @keyup.enter="saveTitle()" 
        >
        <button class="edit" @click="saveTitle()">Save</button>
      </div>
      <div v-else class="note-title">
        <h2>{{newTitle}}</h2>
        <button class="edit" @click="changeTitle = !changeTitle">
          <font-awesome-icon icon="edit" />
        </button>
      </div>
      <!-- Todos -->
      <div class="note-todosArray"
              v-for="(todo, index) in todosArray"
              :key="index"
              :class="todo.checked ? 'done' : ''"
      >
        <input type="checkbox"
                v-model="todo.checked"
        >
        <p v-if="!todo.change"> {{todo.text}} </p>
        <input class="note-input"
                type="text"
                v-else 
                v-model="todo.text"
                @keyup.enter="editTodo(index)"
        >
        <!-- Buttons Todo -->
        <div class="note-btn">
          <button class="edit" @click="editTodo(index)">
            {{todo.change ? 'Save' : ''}}
            <font-awesome-icon icon="edit" />
          </button>
          <button class="remove" @click="removeTodo(index)">
            <font-awesome-icon icon="minus" />
          </button>
        </div>
      </div>
    <!-- Input -->
    <div class="note-input">
      <input type="text"
              placeholder="Input text"
              v-model="newTodo"
              @keyup.enter="addTodo()"
      >
      <button class="add" @click="addTodo()">
        <font-awesome-icon icon="plus" />
      </button>
    </div>
    </div>
    <button class="add" @click="addNote()">
    Add Note
    <font-awesome-icon icon="plus" />
    </button>
    <!-- Modal Window-->
    <modalWindow v-if="showModal" 
                @agree="addNote()" 
                @disagree="showModal = false"
    >
      <h3 slot="header"> Empty </h3>
      <p slot="body"> The note can't be empty </p>
    </modalWindow>
  </div>
</template>

<script>
import modalWindow from './modalWindow'

  export default {
    name: 'NewNote',
    components: {modalWindow},
    
    data() {
      return {
        newTitle:'',
        changeTitle: false,
        todosArray: [],
        newTodo: '',
        showModal: false,
      }
    },
    computed: {
      //массив заметок
      notesList() {
        return this.$store.getters.NOTES;
      },
    },

    methods: {
      saveTitle() {
        if(this.newTitle != '') {
          this.changeTitle = !this.changeTitle 
          this.errorTitle ? this.errorTitle = false : ''
        } 
      },

      editTodo(index) {
        this.todosArray[index].change = !this.todosArray[index].change;
      },

      addTodo() {
        if(this.newTodo != '') {
          this.todosArray.push({
            text: this.newTodo,
            checked:false,
            change: false
          }),
          this.newTodo= ''
        }
      },

      removeTodo(index) {
        this.todosArray.splice(index, 1)
      },

      addNote() {
        let title =  this.newTitle,
            todos = this.todosArray;

        if (title != '' && todos != []) {
          this.$store.dispatch({
          type: 'ADD_NOTE',
          title: this.newTitle,
          todos: this.todosArray,
          id: this.notesList.length 
        });
          this.$router.push({ name:'NotesList'});
        } else {
          this.showModal = !this.showModal
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.note-item {
  padding-bottom: 50px; 
}
.hide-title {
  width: 30%;
  display: flex;
  align-items: baseline;
    input {
      height: 15px;
    }
}

.note-title {
  margin: 0 auto;
  h2 {
    display: inline-block;
  }

  button {
    margin-left: 30px;
  }
}

.note-todosArray {
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
        height: 15px;
        position: absolute;
        top: 10px;
        left: 50px;
        width: 65%;
        padding: 10px;
      }
    }

    .note-btn {
      position: absolute;
      right:  0;
    }

    button {
      margin: 0 10px;
    }
}

.note-input {
  width:80%;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
    input {
      height: 15px;
    }
}

.done {
  background-color: #cacaca;
}
</style>