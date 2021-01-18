<template>
  <div class="links">
    <div class="link_text">友情链接</div>
    <div class="link_item" v-for="(item, index) in links" :key="index">
      <a :href="item.link" target="_blank">{{ item.name }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //友情链接
      links: [{ name: "vuepress", link: "https://www.vuepress.cn/" }],
    };
  },
};
</script>

<style lang="stylus" scoped>
.links {
  border: 0.0625rem solid #c7e5eb;
  padding: 0.625rem;

  // margin-top: 0.625rem;
  .link_text {
    // margin: 0.625rem 0;
    font-size: 700;
    padding-bottom: 0.3125rem;
    border-bottom: 2px solid #eee;
  }

  .link_item {
    margin-top: 0.625rem;

    a {
      color: #666;
    }

    a:hover {
      font-weight: 700;
    }
  }
}
</style>