<template>
	<div>
	<h1>Check List</h1>
    <p>Для изменения задачи кликните по ней 2 раза. Для подтверждения нажмите Enter</p>
    <h4> Список задач</h4>
    <ul v-for="(task,index) in taskList" class="task-list" :key="index"> 
        <li  class="task-check"> 

        <input  v-if="!task.checkedTask" type="checkbox" v-model="task.checkedTask" class="task-check__checkbox"> 
        <span v-if="!task.changeTask" v-bind:style="task.checkedTask ? styleObject : '' " @dblclick="editTask(index)" >
            {{task.text}} 
        </span>                        
        <input v-if="task.changeTask" type="text" v-model="task.text" @keyup.enter="editTask(index)" 
            style="width: 85%">
        <button @click="deleteTask(index)" class="btn btn-danger line" >Delete</button>
        </li>


      </ul>
      
      <label for=""><b>Add new Task: </b></label>

      <input type="text" placeholder="Enter new task" v-model="newTask" @keyup.enter="addTask" style="width: 50%;"> 
      <button @click="addTask()" class="btn btn-primary line">
        Add
      </button>  
    </div>
</template>

<script>
    export default {
        name: 'NotesList',

        data: function() {
            return {
						newTask:'',
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
					taskList: function() {
						return this.$store.getters.TODOS;
					}
				},
				
				// mounted() {
				// 	if(localStorage.taskList) {
				// 		this.taskList = localStorage.taskList
				// 	}
				// },
				// watch : {
				// 	taskList(newTaskList) {
				// 		localStorage.taskList = newTaskList;
				// 	}
				// },
				

        methods: {
            addTask: function(value) {
            value = this.newTask;
            this.taskList.push({
                text: value,
                checkedTask:false,
                changeTask: false
            }),

            this.newTask = ''
            },

            deleteTask: function(index) {
								// this.taskList.splice(index, 1)
								this.$store.commit('SET_TODO', index)
								
            },
            
            editTask: function(index) {
                this.taskList[index].changeTask = !this.taskList[index].changeTask;
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>