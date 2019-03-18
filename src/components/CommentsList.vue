<template>
  <ul>
    <li v-for="(comment, index) in content" :key="index">{{ comment }}</li>
  </ul>
</template>

<script>
export default {
  name: "comments-list",
  props: ["content"]
};
</script>
