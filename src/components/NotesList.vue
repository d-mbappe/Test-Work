<template>
	<div>
  <h1>Notes List</h1>
      <div class="note">
        <div class="note-item"
              v-for="(note, id) in notesList"
              :key="note.id"
        >
          <h2 class="note-title"> {{note.title}} </h2>
          <div class="note-todos"
                v-for="(todo, id) in note.todos"
                :key="id"
            >
              <p v-if="id <=1 "
                  :class="todo.checked ? 'checked-todo' : ''"
                > {{todo.text}} </p>
              <p v-if="id > 1 && id < 3">...</p>
              
          </div>
          <div class="note-btn">
            <button class="edit" @click="goTo(note.id, note.title)" >Edit <font-awesome-icon icon="edit" /></button>
            <button class="remove-note" @click="getNote(id)"><font-awesome-icon icon="trash" /></button>
          </div>
        </div>
      </div>
      <button class="add" @click="addNote()">Add <font-awesome-icon icon="plus" /></button>

      <!-- Modal Window -->
      <modalWindow v-if="showModal" 
                    @agree="removeNote" 
                    @disagree="showModal = false"
      >  </modalWindow>
    </div>
</template>

<script>
import modalWindow from './modalWindow'
    export default {
        name: 'NotesList',
        components: {modalWindow},
        data() {
            return {
              current: '/current-note',
              showModal: false,
              currentId: ''// хранит id заметки для удаления
            }
				},
				computed: {
					notesList() {
						return this.$store.getters.NOTES;
          },
				},
				
        methods: {
          goTo(noteId, noteTitle) {
            // this.$router.push({ name:'CurrentNote', params:{title: noteTitle} });
            this.$router.push({ name:'CurrentNote', params:{id: noteId, title: noteTitle} });
          },

          addNote() {
            if(this.newTitle != '') {
              this.$router.push({ name:'NewNote'});
            }
          },

          getNote(id) {
            this.currentId = id
            this.showModal = !this.showModal; 
          },

          removeNote() {
            this.$store.commit('REMOVE_NOTE', this.currentId)
            this.showModal = false
          },
        
      }
    }
</script>

<style lang="scss" >

  .checked-todo {
    color: #cacaca;
  }
</style>