<template>
  <div id="app">
    <blog-post :id="1" @click="onClick" />
    <comments-list></comments-list>
  </div>
</template>

<script>
import BlogPost from "./components/BlogPost";
import CommentsList from "./components/CommentsList";
import withSubscription from "./hocs/withSubscription";

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
const CommentsListWithSubscription = withSubscription(
  CommentsList,
  DataSource => DataSource.getComments()
);

export default {
  name: "app",
  components: {
    "blog-post": BlogPostWithSubscription,
    "comments-list": CommentsListWithSubscription
  },
  methods: {
    onClick(msg) {
      alert(msg);
    }
  }
};
</script>
