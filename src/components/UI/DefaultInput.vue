<script setup>
const model = defineModel()
const props = defineProps( {
  placeholder: {
    type: String,
    default: ''
  }
} )
const emit = defineEmits( [ 'addTask' ] )

function addTodo( model ) {
  if( model.target.value ) {
    emit( 'addTask', model.target.value )
  }
}

</script>

<template>
  <input
    class="default-input"
    v-model="model"
    autofocus
    :placeholder=props.placeholder
    @keyup.enter="addTodo"
  >
</template>

<style scoped lang="scss">
.default-input {
  position: relative;
  z-index: 1;
  margin: 0;
  width: 100%;
  font-size: 1.5em;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::placeholder {
    opacity: 0.5;
    font-size: 0.8em;

    @media (max-width: 320px) {
      font-size: 0.7em;
    }
  }
}
</style>