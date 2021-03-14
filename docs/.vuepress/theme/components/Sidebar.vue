<template>
  <aside class="sidebar">
    <div class="sidebar_list">
      <div class="sidebar_title">{{title}}</div>
      <div :class="active == item.title ? 'page_list active':'page_list'" v-for="(item, index) in articleList" :key="index">
        <router-link :to="item.path" class="article_item">{{
          item.title
        }}</router-link>
        
      </div>
    </div>
    <NavLinks />

    <slot name="top" />

    <!-- <SidebarLinks
      :depth="0"
      :items="items"
    /> -->
    
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  name: "Sidebar",
  
  components: { SidebarLinks, NavLinks },

  props: ["items"],
  
  computed: {
    title() {
      return this.$frontmatter.categories;
    },
    active() {
      return this.$frontmatter.title;
    },
    articleList() {
      const { pages } = this.$site;
      const { categories } = this.$frontmatter;
      let list = [];
      pages.forEach((item) => {
        if (categories && item.frontmatter.categories == categories) {
          // item.path = '/myBlog' + item.path;
          list.push(item);
        }
      });
      list.sort(function (a, b) {
        if (a.frontmatter.time > b.frontmatter.time) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(list);
      return list;
    },
  },
  watch: {
    
  }
};
</script>

<style lang="stylus">
.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
    color: #000;
  }

  .sidebar_list {
    margin: 1.25rem;

    .sidebar_title {
      margin-bottom: 1rem;
      padding-left: .625rem;
      font-weight 700
    }

    .page_list {
      // margin-bottom: 1rem;
      height: 2.25rem;
      line-height: 2.25rem;
      padding-left: 1rem;
      border-radius: .15rem;
      .article_item {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      

    }
    
    .active {
      border-left: .125rem solid #3eaf7c;
      background-color: #fff;
    }
    
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
      color: #000;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  & > .sidebar-links {
    padding: 1.5rem 0;

    & > li > a.sidebar-link {
      font-size: 1.1em;
      line-height: 1.7;
      font-weight: bold;
    }

    & > li:not(:first-child) {
      margin-top: 0.75rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    & > .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
