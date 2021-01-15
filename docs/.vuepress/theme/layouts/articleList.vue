<template>
  <div class="container">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <main class="article_wrap">
      <div class="article_list">
        <div class="list_item" v-for="item in pageArticles">
          <ArticleBlock :info="item" />
        </div>
      </div>
      <div class="paging" v-if="pagesNum.length > 1">
        <div class="prev item">上一页</div>
        <div class="page_number">
          <div class="number_wrap" ref="number_wrap">
            <div
              class="page_num item"
              v-for="(item, index) in pagesNum"
              :key="index"
              @click="active = index"
              :style="{ background: index == active ? '#28b0d1' : '#eee' }"
            >
              {{ index + 1 }}
            </div>
          </div>
        </div>

        <div class="next item">下一页</div>
      </div>
    </main>
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
  data() {
    return {
      list: new Array(this.articleList),
      active: 0,
    };
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },
  },
  mounted() {
    console.log("hhhh", this.articleList);
  },
  watch: {
    //监测页数移动分页数字的位置
    active() {
      console.log('active',this.active);
      if(this.active > 4) {

        this.$refs.number_wrap.style.transform = `translateX(${-(this.active -4) * 3.125}rem)`
      }else {
        this.$refs.number_wrap.style.transform = "translateX(0)";
      }
      
    }
  },
  computed: {
    pagesNum() {
      let pagesNum = Math.ceil(this.articleList.length / 10);
      return new Array(pagesNum).fill(0);
    },
    pageArticles() {
      let start = this.active * 10;
      return this.articleList.slice(start,start + 10).sort();
    },
    articleList() {
      const { pages } = this.$site;
      const { type } = this.$frontmatter;
      let list = [];
      pages.forEach((item) => {
        if (type && item.frontmatter.categories == type) {
          list.push(item);
        }
      });
      
      return list
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
    width: 43.75rem;
    margin: 4rem 0;
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
}

.paging {
  margin: 1.875rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item {
    background-color: #eee;
    // padding: .325rem 1rem;
    border-radius: 0.3rem;
  }

  .prev {
    padding: .325rem 1rem;
  }

  .page_number {
    width: 25rem;
    overflow: hidden;
    // display: flex;
    white-space: nowrap;

    .page_num {
      width: 2.8125rem;
      display: inline-block;
      margin-right: 0.3125rem;
      text-align: center;
      line-height: 1.875rem;
    }
  }

  .next {
    padding: .325rem 1rem;
  }
}
</style>