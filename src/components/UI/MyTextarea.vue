<template>
  <textarea :value="modelValue" @input="updateInput" class="textarea" placeholder="Комментарий" />
</template>

<script>
export default {
  name: "MyTextarea",
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
.textarea {
  margin-top: 5px;
  padding: 10px;
  height: 100px;
  border: 1px solid teal;
  resize: none;
  font-size: 16px;
}
</style>