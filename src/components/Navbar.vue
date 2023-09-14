<template>
  <div class="navbar">
    <MyButton style="margin-top: 5px; margin-left: 5px;" @click="$router.push('/')">
      Home
    </MyButton>
    <MyButton @click="$router.push('/comment')">
      Комментарии
    </MyButton>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "Navbar",
  components: {MyButton},
}
</script>

<style scoped>
.navbar {
  background-color: teal;
  height: 50px;
}
</style>