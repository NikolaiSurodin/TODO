<script setup>
import DefaultInput from '@/components/UI/DefaultInput.vue'
import DefaultTabs from '@/components/UI/DefaultTabs.vue'
import TaskList from '@/components/TaskList.vue'

import { fetchTaskList } from '@/services/task.service.js'
import Task from '@/classes/Task.js'

import { ref, onBeforeMount, computed } from 'vue'
import EditModal from '@/components/modals/EditModal.vue'
import { taskStatus } from '@/const/taskStatus.js'
import { toggleMainScroll, setLocalStorage, getLocalStorage } from '@/helpers/index.js'

const STORAGE_KEY = 'tasks'

onBeforeMount( () => {
  getTaskList()
} )

const activeTaskList = computed( () => {
  return taskList.value.filter( ( el ) => !el.completed )
} )

const completedTaskList = computed( () => {
  return taskList.value.filter( ( el ) => el.completed )
} )

const getTodoList = computed( () => {
  let list = taskList.value
  if( activeTab.value.name === 'All' ) {
    return list
  } else {
    list = activeTab.value.name === taskStatus.COMPLETED ? completedTaskList.value : activeTaskList.value
  }
  return list
} )

const taskList = ref( getLocalStorage( STORAGE_KEY ) || [] )

const isLoading = ref( false )

function getTaskList() {
  if( !taskList.value.length ) {
    isLoading.value = true
    fetchTaskList()
      .then( data => {
        taskList.value = data.map( ( el ) => new Task( el ) )
        setLocalStorage( { key: STORAGE_KEY, data: taskList.value } )
        isLoading.value = false
      } )
      .finally( () => isLoading.value = false )
  }
}

const isShowModal = ref( false )
const editCurrentTask = ref( {} )

function showEditModal( params ) {
  const { show, task } = params
  isShowModal.value = show
  editCurrentTask.value = task
  toggleMainScroll( show )
}

const tabList = [
  {
    name: taskStatus.ALL,
    active: true
  },
  {
    name: taskStatus.ACTIVE,
    active: false
  },
  {
    name: taskStatus.COMPLETED,
    active: false
  },
]
const activeTab = ref( tabList.find( el => el.active ) )

function setActiveTab( tab ) {
  activeTab.value = tab
}

const newTaskTitle = ref( '' )

function addNewTaskTitle( title ) {
  if( !title ) return

  const task = new Task( {
    title,
    completed: false,
  } )

  taskList.value.unshift( task )
  setLocalStorage( { key: STORAGE_KEY, data: taskList.value } )
  newTaskTitle.value = ''
}

function editTask( task ) {
  const { id, title, completed } = task
  const editableTask = taskList.value.find( el => el.id === id )
  editableTask.title = title
  editableTask.completed = completed

  setLocalStorage( { key: STORAGE_KEY, data: taskList.value } )
}

function removeTask( task ) {
  taskList.value = taskList.value.filter( el => el.id !== task.id )
  setLocalStorage( { key: STORAGE_KEY, data: taskList.value } )
}

</script>

<template>
  <section class="app-todo">
    <div class="app-todo__inner">
      <section class="app-todo__input">
        <DefaultInput
          placeholder="Create a new task. What we need to do?"
          v-model="newTaskTitle"
          @add-task="addNewTaskTitle"
        />
        <section
          class="app-todo__add-button"
          :class="{ 'app-todo__add-button--show': newTaskTitle }"
        >
          <button
            class="btn"
            :disabled="!newTaskTitle"
            @click="addNewTaskTitle( newTaskTitle )"
          >
            Create
          </button>
        </section>
      </section>
      <section class="app-todo__task-list">
        <h1 class="h1 app-todo__list-title">Tasks list: {{ activeTab.name.toLowerCase() }}</h1>
        <DefaultTabs
          :items="tabList"
          :active-tab="activeTab.name"
          @set-active-tab="setActiveTab"
        />
        <TaskList
          :todo-list="getTodoList"
          :is-loading="isLoading"
          :active-tab="activeTab"
          @edit="showEditModal"
          @remove="removeTask"
          @complete="editTask"
        />
      </section>
      <Teleport to="body">
        <EditModal
          :show="isShowModal"
          :item="editCurrentTask"
          @edit="editTask"
          @close="showEditModal( { show: false, task: {} } )"
        >
          <template #header>
          </template>
        </EditModal>
      </Teleport>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../assets/mixins";

.app-todo {
  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #f2f2f2;
    padding-bottom: 50px;
  }

  & &__input {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &__add-button {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    padding: 12px;
    transform: translateY(-44px);
    visibility: hidden;
    transition: 0.2s;

    @include ipadpro {
      display: flex;
    }

    &--show {
      transform: translateY(0);
      visibility: visible;
    }
  }

  &__task-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 12px;
    gap: 0.8em;
  }

  &__list-title, &__empty-list {
    font-size: 1.5rem;
    text-align: center;
  }
}

</style>
