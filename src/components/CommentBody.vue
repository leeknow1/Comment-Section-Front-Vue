<template>
  <div class="comment" >
    <div>
      <div><small>{{ comment.id }}</small></div>
      <div><strong>Автор:</strong> {{ comment.author }}</div>
      <div>{{ comment.message }}</div>
    </div>
    <div>
      <MyButton @click="$emit('create', comment.id)">Ответить</MyButton>
      <MyButton @click="$emit('remove', comment.id)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "CommentBody",
  components: {MyButton},
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.comment {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>