<template>
  <div class="container">
    <meta charset="UTF-8">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <main class="article_wrap">
      <div class="article_list">
        <div class="list_title">{{ pageName }}</div>
        <div
          class="list_item"
          v-for="(item, index) in pageArticles"
          :key="index"
        >
          <ArticleBlock :info="item" />
        </div>
        <div class="pages" v-if="pagesNum.length > 1">
          <div class="prev item" @click="onPageChange(-1)">上一页</div>
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

          <div class="next item" @click="onPageChange(1)">下一页</div>
        </div>
      </div>
      <div class="aside_info">
        <!-- 标签 -->
        <Tags />
        <!-- 友情链接 -->
        <Links />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue";
import ArticleBlock from "@theme/components/ArticleBlock.vue";
import Tags from "@theme/components/Tags.vue";
import Links from "@theme/components/Links.vue";
export default {
  components: {
    Navbar,
    ArticleBlock,
    Tags,
    Links,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },
    //上一页下一页时间
    onPageChange(index) {
      let newIndex = this.active + index;
      if (newIndex < 0 || newIndex == this.pagesNum.length) {
        return;
      }
      this.active = newIndex;
    },
  },
  onLoad() {
    // console.log("hhhh", this.$frontmatter);
  },
  watch: {
    //监测页数移动分页数字的位置
    active() {
      // console.log("active", this.active);
      if (this.active > 4) {
        this.$refs.number_wrap.style.transform = `translateX(${
          -(this.active - 4) * 3.125
        }rem)`;
      } else {
        this.$refs.number_wrap.style.transform = "translateX(0)";
      }
    },
  },
  computed: {
    //分类名称
    pageName() {
      return this.$frontmatter.type;
    },
    //页数数组，仅用来表示有多少页
    pagesNum() {
      let pagesNum = Math.ceil(this.articleList.length / 10);
      return new Array(pagesNum).fill(0);
    },
    //当前页的文章数组
    pageArticles() {
      let start = this.active * 10;
      return this.articleList.slice(start, start + 10).sort();
    },
    //总的文章列表
    articleList() {
      const { pages } = this.$site;
      const { type } = this.$frontmatter;
      let list = [];
      pages.forEach((item) => {
        if (type && item.frontmatter.categories == type) {
          list.push(item);
        }
      });
      //根据time属性排序
      list.sort(function (a, b) {
        if (a.frontmatter.time > b.frontmatter.time) {
          return -1;
        } else {
          return 1;
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
  // position: relative;
  min-width: 60rem;
  max-width: 70rem;
  margin: 5rem auto;

  .article_wrap {
    // margin: 5rem 0;
    padding: 1.25rem;
    background-color: #fff;
    display: flex;

    .article_list {
      flex: 2;

      .list_title {
        height: 2.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        border-bottom: 0.125rem solid #eee;
      }

      .pages {
        margin: 1.875rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
          background-color: #eee;
          // padding: .325rem 1rem;
          border-radius: 0.3rem;
        }

        .item:hover {
          color: #28b0d1;
          cursor: pointer;
        }

        .prev {
          padding: 0.325rem 1rem;
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
          padding: 0.325rem 1rem;
        }
      }
    }

    .aside_info {
      flex: 1;
      margin-left: 1.3rem;
      padding: 0 2.5rem;
    }
  }
}
</style>