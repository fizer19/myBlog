<template>
  <div class="container">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <main class="article_wrap">
      <div class="article_list">
        <div class="list_item" v-for="item in articleList">
          <ArticleBlock :info="item" />
        </div>
      </div>
    </main>
    <footer>
      <div class="about">Copyright &nbsp 2021- | fizer</div>
    </footer>
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue";
import ArticleBlock from "@theme/components/ArticleBlock.vue";
export default {
  components: {
    Navbar,
    ArticleBlock,
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },
  },
  mounted() {
    // console.log("hhhh", this.articleList);
  },
  computed: {
    articleList() {
      const { pages } = this.$site;
      const { type } = this.$frontmatter;
      let list = [];
      pages.forEach((item) => {
        if (type && item.frontmatter.categories == type) {
          list.push(item);
        }
      });

      return list;
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.container {
  position: relative;
  .article_wrap {
    margin-top: 4.0rem;
    padding-left: 20rem;
    min-height: 56.25rem;
    // background-color: #fffbf0;
    background-color: #fff;
  }

  aside {
    position: fixed;
    width: 20rem;
    height: 100%;
  }
  footer {
    position: absolute;
    height: 3.125rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    line-height: 3.125rem;
    color: #666;
  }
}
</style>