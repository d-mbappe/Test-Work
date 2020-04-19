<template>
  <div id="app">
    <!-- <NotesList/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import NotesList from './components/NotesList'

export default {
  name: 'App',
  // components: {
  //   NotesList
  // }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.note-item {
    width: 70%;
    margin: 5px auto;
    border: 1px solid #ccc;
  }
</style>
