<script setup>
const props = defineProps( {
  items: {
    type: Array,
    default: () => ( [] )
  },
  activeTab: {
    type: String,
    default: ''
  }
} )

const emit = defineEmits( [ 'setActiveTab' ] )

function setActiveIndex( item ) {
  emit( 'setActiveTab', item )
}
</script>

<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li
        v-for="( item, index ) in items"
        :key="index"
        class="tabs__item"
        :class="{ 'tabs__item--active': item.name === activeTab }"
        @click="setActiveIndex( item )"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    list-style: none;
  }

  &__item {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    min-width: 95px;
    text-align: center;

    &:hover {
      background-color: #eee;
    }

    &--active {
      background-color: hsla(160, 100%, 37%, 0.2);
      border: 1px solid hsla(160, 100%, 37%, 0.2);

      &:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
      }
    }
  }
}
</style>