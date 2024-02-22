<script setup>

</script>

<template>
  <div class="default-loader">
    <div class="default-loader__spinner"></div>
  </div>
</template>


<style lang="scss" scoped>

.default-loader {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 18px 0;

  &__spinner {
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after {
      content: '';
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 3px solid hsla(160, 100%, 37%, 1);
      border-color: hsla(160, 100%, 37%, 1) transparent hsla(160, 100%, 37%, 1) transparent;
      animation: spinner 1.2s linear infinite;
    }
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
