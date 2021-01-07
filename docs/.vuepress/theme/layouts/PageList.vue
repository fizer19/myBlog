<template>
  <div>
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />
    <pre>

      <Content />
    </pre>
      
      <div class="page_list" v-for="(item,index) in $site.pages">
        <router-link :to="item.path" class="article_item">{{item}}</router-link>
        <div class="article">{{item.frontmatter.description}}</div>
      </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
export default {
  components: {
    
    
    Navbar
  },
  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
  },
  mounted() {
    console.log('hhhh',this.$route.path);
  },
  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },
  }
}
</script>

<style>
.page_list {
  margin-top: 100px;
}
</style>