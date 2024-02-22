<script setup>

const props = defineProps( {
  task: {
    type: Object,
    default: () => ( {} )
  }
} )
const emit = defineEmits( [ 'edit', 'remove' ] )

</script>

<template>
  <div class="task" @dblclick="emit('edit')">
    <div class="task__inner">
      <div class="task__header">
        <p class="task__date">
          {{ new Date( props.task.date ).toLocaleDateString() }}
          <span class="dot">•</span>
          {{ new Date( props.task.date ).toLocaleTimeString() }}
        </p>
        <div class="task__header-actions">
          <div
            class="task__delete-action"
            role="button"
            @click="emit('remove')"
          >
            <img src="@assets/images/svg/close.svg" alt="close" class="task__close-icon">
          </div>
        </div>
      </div>
      <div class="task__body">
        <div
          class="task__body-description"
          :class="{ 'task__body-description--completed': props.task.completed }"
        >
          <p>{{ props.task.title }}</p>
        </div>
        <div class="task__body-actions">
          <button class="btn btn-primary" @click="emit('edit')">
            <img src="@assets/images/svg/edit.svg" alt="edit">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(60, 60, 60, 0.12);
  padding: 0.5em;
  transition: all 0.2s;
  color: #2C3E50FF;
  border-radius: 0.5em;

  &:hover {
    background-color: rgba(60, 60, 60, 0.12);
  }

  &__date {
    font-size: 0.8em;
    opacity: 0.8;
    color: var(--vt-c-text-secondary);
  }

  &__header-actions {
    position: absolute;
    top: 0;
    right: 12px;
    display: flex;
    justify-content: flex-end;
    padding: 0.5em 0;
  }

  &__close-icon {
    width: 20px;
  }

  &__body-actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 0.5em;
  }

  &__body-description {
    padding: 0.8em;

    &--completed {
      text-decoration: line-through;
      color: #c4c4c4;
    }
  }
}

</style>