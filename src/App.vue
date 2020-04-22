<template>
  <div id="app">

    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
$black: #363839;
$lightgray: #ccc;
$gray: #bdc1c6;
$white: #fff;
$green: #42b983;
$red: #ff5252;
$blue: #74b3ee;
$purple: #c08fd4;

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  display: inline-block;
  margin: 10px;
  padding: 0.5em 1em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  letter-spacing: 0.15em;
  text-align: center;
  text-transform: uppercase;

  border: none;
  color: $white;
  background-color: transparent;
  cursor: pointer;

  border: 1px solid $lightgray;
  border-radius: 30px;
  box-shadow:0 3px 1px -2px #00000033, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f;

  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: inset 0 0 5px #fff;
  }
  // стили для кнопок
  &.edit {
    text-transform: none;
    background-color: $blue;
  }

  &.remove {
    background-color: $red;
    &-note {
      @extend .remove;
      height: 35px;
      width: 35px;
      position: absolute;
      padding: 0px;
      top: 0;
      right: 0;
      border-radius: 50%;
    }
  }

  &.add {
    background-color: $green;
  }

  &.changes {
    width: 60px;
    height: 20px;
    font-size: 8px;
    text-transform: none;
    background-color: $purple;
  }

}

.note-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  min-height: 200px;
  margin: 15px auto;
  border: 1px solid $lightgray;

  position: relative;

    input {
      &[type='text'] {
        width: 70%;
        padding: 5px 10px;
      }
      
    }
}
// Modal Winodw
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px #00000054;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
.modal-buttons{
  display: flex;
  justify-content: center;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

// Checkbox 
input[type="checkbox"] {
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: $black;
  border: 1px solid $gray;
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 0px;
    left: 5px;
    width: 8px;
    height: 10px;
    border-style: solid;
    border-color: $white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: $white;
    background: $green;
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}

</style>
