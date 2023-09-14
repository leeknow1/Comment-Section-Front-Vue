<template>
  <form>
    <h4>Добавить комментарий</h4>
    <MyInput v-model="comment.author" type="text" placeholder="Автор"/>
    <MyTextarea v-model="comment.message" placeholder="Комментарий" />
    <MyButton style="align-self: flex-end; margin-top: 10px;" @click.prevent="addComment">Отправить</MyButton>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
import MyTextarea from "@/components/UI/MyTextarea";
export default {
  name: "CommentForm",
  components: {MyTextarea, MyInput, MyButton},
  data() {
    return {
      comment: {
        id: '',
        author: '',
        message: ''
      }
    }
  },
  methods: {
    addComment() {
      this.$emit('create', this.comment)
      this.comment = {
        author: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>