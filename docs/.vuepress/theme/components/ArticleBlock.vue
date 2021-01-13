<template>
  <router-link :to="info.path" class="article_item">
    <div class="article_img">
      <img :src="info.frontmatter.url || defaultImg" alt="" />
    </div>
    <div class="article_info">
      <div class="article_title">{{ info.frontmatter.title }}</div>
      <div class="article_description">
        {{ info.frontmatter.description }}
      </div>
      <div class="article_tags">
        <div class="author">
          <div class="iconfont iconbussiness-man"></div>
          <div class="name">{{ info.frontmatter.author }}</div>
        </div>
        <div class="update_time">
          <div class="iconfont iconclock"></div>
          <div class="time">{{ info.frontmatter.time }}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    info: Object,
  },
  data() {
    return {
      defaultImg: "/myBlog/assets/img/article1.png",
    };
  },
  mounted() {
    // console.log(this.info);
  },
};
</script>

<style lang="stylus" scoped>
.article_item:hover {
  background-color: #eee;
}

.article_item {
  width: 43.75rem;
  // height: 13.125rem;
  display: flex;
  justify-content: center;
  border-bottom: 0.125rem solid #eee;
  padding: 1.5rem 0;

  .article_img {
    // flex: 1;
    width: 8.75rem;
    height: 8.75rem;

    img {
      width: 100%;
      height: 8.75rem;
    }
  }

  .article_info {
    flex: 4;
    margin-left: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .article_title {
      font-weight: 700;
      color: #474645;
      font-size: 1rem;
    }

    .article_description {
      color: #778cbd;
      font-size: 0.75rem;
      margin: 1.25rem 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-indent: 1.5rem;
    }

    .article_tags {
      display: flex;
      font-size: 0.75rem;
      color: #999;

      .iconfont {
        color: #00a9e0;
        transform: translateY(-5%);
      }

      .author {
        display: flex;
        justify-content: flex-end;
      }

      .update_time {
        display: flex;
        margin-left: 0.625rem;
      }
    }
  }
}
</style>