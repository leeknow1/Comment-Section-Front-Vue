<template>
  <div class="comments">
    <h3>Комментарии:</h3>
    <transition-group name="list">
      <div v-for="comment in comments" :key="comment.id">
        <Comment :comment="comment" @remove="$emit('remove', comment.id)" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
import MyButton from "@/components/UI/MyButton";

export default {
  name: "CommentList",
  components: {MyButton, Comment},
  props: {
    comments: {
      type: Array,
      required: true
    },
  }
}
</script>

<style scoped>
.comments {
  margin-top: 10px;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
</style>