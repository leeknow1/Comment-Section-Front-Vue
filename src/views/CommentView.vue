<template>
  <div class="main">
    <div>
      <MyButton @click="showDialog">Добавить комментарий</MyButton>
      <MyDialog v-model:visible="dialogVisible">
        <CommentForm @create="addComment"/>
      </MyDialog>
    </div>
    <div v-if="!isLoading">
      <div v-if="this.comments.length > 0">
        <CommentList @remove="removeComment" :comments="this.comments"/>
      </div>
      <div v-else>
        <h2 style="margin-top: 10px;">Комментариев нет</h2>
      </div>
    </div>
    <div v-else>
      <h2 style="margin-top: 10px;">Загрузка...</h2>
    </div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import axios from 'axios'
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";

export default {
  name: "CommentView",
  components: {MyButton, MyDialog, CommentForm, CommentList},

  data() {
    return {
      comments: [],
      dialogVisible: false,
      isLoading: false,
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
    async fetchComments() {
      try {
        this.isLoading = true;
        const response = await axios.get('http://localhost:8010/comment', {params: {
            page: this.page,
            limit: this.limit
          }})
        this.comments = response.data;
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    async loadMoreComments() {
      try {
        this.page += 1;
        const response = await axios.get('http://localhost:8010/comment', {params: {
            page: this.page,
            limit: this.limit
          }})
        this.comments = [...this.comments, ...response.data]
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
      } catch (e) {
        console.log(e)
      }
    },
    async addComment(comment) {
      try {
        const response = await axios.post('http://localhost:8010/comment', comment)
        this.comments.unshift(response.data)
      } catch (e) {
        console.log(e)
      } finally {
        this.dialogVisible = false;
      }
    },
    async removeComment(id) {
      try {
        await axios.delete(`http://localhost:8010/comment/${id}`)
        this.comments = this.comments.filter(c => c.id !== id)
      } catch (e) {
        console.log(e)
      }
    },
    showDialog() {
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.fetchComments();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages){
        this.loadMoreComments();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  }
}
</script>

<style scoped>
.main {
  padding: 20px;
}
.observer {
  height: 30px;
}
</style>