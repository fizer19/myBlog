<template>
  <div class="container">
    <!-- meta标签用来反 -->
    <meta name="referrer" content="no-referrer" />
    <main class="home">
      <div class="img_auto">
        <div class="img_item" v-for="(item, index) in urls" :key="index">
          <img :src="item" alt="图" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // urls: [
      //   "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F54aca45d1d24f.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613030206&t=825479c2e49308aea6fbf5f47259210f",
      //   "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F26%2F18138%2Fc88efa174d27c179.jpg&refer=http%3A%2F%2Fdik.img.kttpdq.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613030323&t=83d33fe9c1f97777a9c0f7c46b86c7f0",
      //   "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F587c33547c077.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613030410&t=69a969fd6139eb4464c6c67e752de029",
      // ],
      urls: [
        "/myBlog/assets/img/item1.jpg",
        "/myBlog/assets/img/item2.jpg",
        "/myBlog/assets/img/item3.jpg",
      ],
    };
  },
};
</script>

<style lang="stylus">
.container {
  margin-top: 3.6rem;
  padding: 0.625rem;

  .home {
    // max-width: 56.875rem;
    
    margin: 1.25rem auto;

    .img_auto {
      display: flex;
      
      overflow hidden;
      .img_item {
        
        width: 56.875rem;
        
        
        img {
          width: 100%;
          
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
