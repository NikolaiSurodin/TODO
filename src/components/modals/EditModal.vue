<script setup>
import { ref, watch, nextTick, watchEffect, computed } from 'vue'

const props = defineProps( {
  show: Boolean,
  item: {
    type: Object,
    default: () => ( {} )
  }
} )
const emit = defineEmits( [ 'close', 'edit' ] )

const modal = ref( null )


watch(
  () => props.show,
  ( value ) => {
    if( value ) {
      nextTick( () => {
        modal.value.focus()
      } )
    }
  },
  { deep: true }
)

function closeModal() {
  emit( 'close' )
}

const text = ref( props.item?.title )
watchEffect( () => {
  text.value = props.item.title || ''
} )

const isSaveDisable = computed( () => {
  return !text.value
} )

function saveTask( params = {} ) {
  if( text.value.trim() === '' ) return

  emit( 'edit', { title: text.value, id: props.item.id, completed: false, ...params } )
  text.value = ''
  closeModal()
}

function completeTask() {
  saveTask( { completed: true } )
}

</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="edit-modal"
      ref="modal"
      @keyup.esc="closeModal"
      @keyup.ctrl.enter="saveTask"
      tabindex="0"
    >
      <div class="edit-modal__container">
        <div class="edit-modal__header">
          <slot name="header"></slot>
        </div>

        <div class="edit-modal__body">
          <slot name="body"></slot>
          <section class="edit-modal__body-header">
            <div
              class="edit-modal__close-icon"
              role="button"
              @click="closeModal"
            >
              <img src="@assets/images/svg/close.svg" alt="close">
            </div>
          </section>
          <section class="edit-modal__body-title">
          </section>
          <div class="edit-modal__inner">
            <textarea
              rows="10"
              class="edit-modal__textarea"
              v-model="text"
            >
            </textarea>
            <div class="edit-modal__action-buttons">
              <button
                class="btn"
                @click="saveTask"
                :disabled="isSaveDisable"
              >
                {{ props.item.completed ? 'Restore' : 'Save' }}
              </button>
              <button
                class="btn btn-success"
                @click="completeTask"
              >
                Complete
                <img src="@assets/images/svg/done.svg" class="edit-modal__check-icon">
              </button>
            </div>
          </div>
        </div>
        <div class="edit-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import "../../assets/mixins";

.edit-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  color: #f2f2f2;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 30px;
    opacity: 1;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    @include tablet {
      padding: 0;
    }
  }

  &__header {
    position: absolute;
    right: 50px;
    top: 35px;
    font-size: 25px;
    margin-top: 0;
    color: #f2f2f2;
  }

  &__header-close-icon {
    cursor: pointer;
    font-size: 24px;
    color: #f2f2f2;
  }

  &__body {
    margin: 20px 0;
    background: #F2F2F2FF;
    border: 1px solid hsla(0, 0%, 100%, .05);
    border-radius: 12px;
    flex-direction: column;
    padding: 20px 32px 40px;
    width: 100%;
    max-width: 800px;
    height: 100%;
    color: #2c3e50;
  }

  &__body-header {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  &__inner {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    display: flex;
  }

  &__action-buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
    gap: 12px;
  }

  &__button {
    margin-top: 50px;
  }

  &__check-icon {
    width: 20px;
    padding: 3px
  }
}

</style>