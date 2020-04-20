<template>
	<div>
  <h1>Notes List</h1>
      <div class="note">
        <div class="note-item"
              v-for="(note) in notesList"
              :key="note.id"
        >
          <h2 class="note-title"> {{note.title}} </h2>
          <div class="note-todos"
                v-for="(todo, id) in note.todos"
                :key="id"
            >
              <p v-if="id <=1 "
                  :class="todo.checked ? 'cheched-todo' : ''"
                > {{todo.text}} </p>
          <p v-if="id > 1 && id < 3">...</p>
              
          </div>
          <button @click="goTo(note.title)">More</button>
        </div>

      </div>
      <input type="text" placeholder="Note title" v-model="newTitle">
      <button @click="addNote()">Add note</button>

    </div>
</template>

<script>
    export default {
        name: 'NotesList',

        data() {
            return {
            current: '/current-note',
            newTitle: '',
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

          addNote() {
            if(this.newTitle != '') {
              this.$store.commit('ADD_NOTE', this.newTitle,)
              this.$router.push({ name:'CurrentNote', params:{title: this.newTitle } });
            }
          },
        }
    }
</script>

<style lang="scss" scoped>

  .cheched-todo {
    color: #8de98d;
  }
</style>