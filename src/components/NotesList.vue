<template>
	<div>
	<!-- <h1>Check List</h1>
    <p>Для изменения задачи кликните по ней 2 раза. Для подтверждения нажмите Enter</p>
    <h4> Список задач</h4>
    <u v-for="(task,index) in taskList" class="task-list" :key="index"> 
        <li  class="task-check"> 

        <input  v-if="!task.checkedTask" type="checkbox" v-model="task.checkedTask" class="task-check__checkbox"> 
        <span v-if="!task.changeTask" v-bind:style="task.checkedTask ? styleObject : '' " @dblclick="editTask(index)" >
            {{task.text}} 
        </span>                        
        <input v-if="task.changeTask" type="text" v-model="task.text" @keyup.enter="editTask(index)" 
            style="width: 85%">
        <button @click="deleteTask(index)" class="btn btn-danger line" >Delete</button>
        </li>


      </u>
      
      <label for=""><b>Add new Task: </b></label>

      <input type="text" placeholder="Enter new task" v-model="newTask" @keyup.enter="addTask" style="width: 50%;"> 
      <button @click="addTask()" class="btn btn-primary line">
        Add
      </button>   -->
<h1>Check List</h1>
      <div class="note">
        <div class="note-item"
              v-for="note in notesList"
              :key="note.id"
        >
          <h2 class="note-title"> {{note.title}} </h2>
          <div class="note-todos"
              v-for="(todo, index) in note.todos"
              :key="index"
            >
              <p v-if="index <=1 "> {{todo.text}} </p>
              <p v-else> ... </p>
          </div>
          <button @click="goTo(note.title)">More</button>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'NotesList',

        data: function() {
            return {
            newTask:'',
            current: '/current-note'
            // taskList: [
            //     {text:'First - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checkedTask: false, changeTask: false},
            //     {text:'Second - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checkedTask: false, changeTask: false},
            //     {text:'Third - Lorem ipsum dolor sit amet, consectetur adipisicing elit.', checkedTask: false, changeTask: false},
            // ],
            // styleObject: {
            //     'text-decoration': 'line-through',
            //     opacity: '.7'
            // },
            // newTask:'',
            // changeTask: false,
            }
				},
				computed: {
					notesList: function() {
						return this.$store.getters.NOTES;
					}
				},
				
        methods: {
          goTo(noteTitle) {
            this.$router.push({ name:'CurrentNote', params:{title: noteTitle} });
          },

            // addTask: function(value) {
            // value = this.newTask;
            // this.taskList.push({
            //     text: value,
            //     checkedTask:false,
            //     changeTask: false
            // }),

            // this.newTask = ''
            // },

            // deleteTask: function(index) {
						// 		this.$store.commit('DELETE_TODO', index)
								
            // },
            
            // editTask: function(index) {
            //     this.taskList[this.current].changeTask = !this.taskList[index].changeTask;
            // },
        }
    }
</script>

<style lang="scss" scoped>
  
</style>