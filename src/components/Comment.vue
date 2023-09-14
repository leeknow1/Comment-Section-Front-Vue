<template>
  <MyDialog v-model:visible="dialogVisible">
    <CommentForm @create="reply"/>
  </MyDialog>
  <CommentBody @create="send" @remove="$emit('remove', comment.id)" :comment="comment"/>
  <div v-if="replies.length > 0">
    <h4 v-if="!repliesShown" @click="showReplies">Показать комментарии ({{replies.length}})</h4>
  </div>
  <div v-if="repliesShown" style="margin-left: 30px;">
    <transition-group name="list">
      <CommentBody v-for="reply in replies" :key="reply.id" @create="send" @remove="removeReply" :comment="reply"/>
    </transition-group>
    <h4 @click="closeReplies">Свернуть</h4>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import CommentList from "@/components/CommentList";
import CommentBody from "@/components/CommentBody";
import MyDialog from "@/components/UI/MyDialog";
import CommentForm from "@/components/CommentForm";
import axios from "axios";
export default {
  components: {CommentForm, MyDialog, CommentBody, CommentList, MyButton},
  name: "Comment",
  emits: ["remove"],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      replies: [],
      dialogVisible: false,
      repliesShown: false
    }
  },
  methods: {
    send(id) {
      this.dialogVisible = true;
      this.comment.replyId = id;
    },
    showReplies() {
      this.repliesShown = true;
    },
    closeReplies() {
      this.repliesShown = false;
    },
    async removeReply(id) {
      try {
        await axios.delete(`http://localhost:8010/comment/${id}`)
        this.replies = this.replies.filter(r => r.id !== id)
      } catch (e) {
        console.log(e)
      }
    },
    async reply(comment) {
      try {
        const response = await axios.post(`http://localhost:8010/comment/${this.comment.replyId}`, comment)
        this.replies.push(response.data);
      } catch (e) {
        console.log(e)
      } finally {
        this.dialogVisible = false;
      }
    },
    async loadReplies() {
      try {
        const response = await axios.get(`http://localhost:8010/comment/${this.comment.id}/replies`);
        this.replies = response.data;
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.loadReplies()
  }
}
</script>

<style scoped>
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