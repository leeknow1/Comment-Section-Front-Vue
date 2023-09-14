<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text"/>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: String
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 5px;
  border: 1px solid teal;
  width: 100%;
  padding: 10px;
}
</style>