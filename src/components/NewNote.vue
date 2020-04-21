<template>
  <div>
    <h2>New Note</h2>

    <div class="note-item">

      <div v-if="!changeTitle">
        <p v-if="errorTitle">Title don`t be empty</p>
        <input type="text" 
                placeholder="Title"
                v-model="newTitle"
                @keyup.enter="saveTitle()" 
        >
        <button @click="saveTitle()">Save</button>
      </div>

      <div v-else class="note-title">
        <h2>{{newTitle}}</h2>
        <button @click="changeTitle = !changeTitle">change</button>
      </div>

      <div class="note-todosArray"
              v-for="(todo, index) in todosArray"
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
                placeholder="Input text"
                v-model="newTodo"
        >
        <button @click="addTodo()">add</button>

      </div>
    </div>
        <button @click="addNote()">ADD note</button>

  </div>
</template>

<script>
  export default {
    name: 'NewNote',
    data() {
      return {
        newTitle:'',
        errorTitle: false,
        changeTitle: false,
        todosArray: [],
        newTodo: '',
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
        } else {
          this.errorTitle = true
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
          alert('no')
        }
        
      }

    }
  }
</script>

<style lang="scss" scoped>
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
</style>