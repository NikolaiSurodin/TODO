<script setup>
import TaskItem from '@components/task/TaskItem.vue'
import DefaultLoader from '@components/UI/DefaultLoader.vue'

const props = defineProps( {
  todoList: {
    type: Array,
    default: () => ( [] )
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  activeTab: {
    type: Object,
    default: () => ( {} )
  }
} )

const emit = defineEmits( [ 'edit', 'remove', 'complete' ] )

</script>

<template>
  <section class="tasks-list">
    <TransitionGroup name="fade">
      <template v-if="props.isLoading">
        <DefaultLoader />
      </template>
      <template v-else-if="props.todoList.length">
        <TaskItem
          v-for="task in props.todoList"
          :key="task.id"
          :task="task"
          @edit="emit('edit', { show: true, task })"
          @remove="emit('remove', task )"
          @complete="emit('complete', task )"
        />
      </template>
      <template v-else>
        <div class="tasks-list__empty-list">
          <h1 class="h1 tasks-list__empty-list-title">No {{ props.activeTab.name }} tasks</h1>
        </div>
      </template>
    </TransitionGroup>
  </section>
</template>

<style scoped lang="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__list-title, &__empty-list {
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>