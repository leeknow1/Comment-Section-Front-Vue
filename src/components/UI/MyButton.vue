<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>
.button {
  padding: 10px;
  border: 1px solid teal;
  color: teal;
}
</style>