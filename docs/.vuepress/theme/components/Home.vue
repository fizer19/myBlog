<template>
  <div class="container">
    <main class="home">
      <!-- 轮播图 -->
      <div class="img_auto">
        <div
          class="img_item"
          :style="{ opacity: index == active ? 1 : 0 }"
          v-for="(item, index) in urls"
          :key="index"
        >
          <img :src="item" alt="图" />
        </div>
        <!-- 圆点 -->
        <div class="bullet_wrap">
          <div
            :class="index == active ? 'bullet active' : 'bullet'"
            v-for="(item, index) in urls"
            :key="index"
            @click="active = index"
          ></div>
        </div>
      </div>
      <div class="content">
        <div class="article_wrap">
          <div  class="recomend">
            <div class="picture">
              <img :src="articles.recommend.frontmatter.url" alt="" />
            </div>
            <router-link :to="articles.recommend.path" class="article_info">
              <div class="title">{{articles.recommend.frontmatter.title}}</div>
              <div class="descript">{{articles.recommend.frontmatter.description}}</div>
              <div class="tags">
                <div class="author">
                  <div class="iconfont iconbussiness-man"></div>
                  <div class="name">{{articles.recommend.frontmatter.author}}</div>
                </div>
                <div class="update_time">
                  <div class="iconfont iconclock"></div>
                  <div class="time">{{articles.recommend.frontmatter.time}}</div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="article_list">
            <div class="article_item" v-for="(item,index) in articles.list" :key="index">
              <ArticleBlock :info="item" />
            </div>
            
          </div>
        </div>
        <div class="aside_info">
          <div class="about_me">
            <div class="title">关于我</div>
            <img src="/myBlog/assets/img/avatar.png" alt="" />
            <div class="info">
              <div class="info_type">个人资料</div>
              <div class="description">95后，双鱼座，兴趣广泛，童心未泯</div>
              <div class="email">邮箱：fizer19@gmail.com</div>
            </div>
          </div>
          <div class="links">
            <div class="link_text">友情连接</div>
            <a href="https://www.vuepress.cn/">vuepress</a>
          </div>
        </div>
      </div>

      <header class="hero">
      <!-- <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      > -->

      <h1
        v-if="data.heroText !== null"
        id="main-title"
      >
        {{ data.heroText || $title || 'Hello' }}
      </h1>

      <p
        v-if="data.tagline !== null"
        class="description"
      >
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>

      <p
        v-if="data.actionText && data.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
    </main>
    <div class="copyright">Copyright | 2021- by fizer</div>
  </div>
</template>

<script>
import ArticleBlock from "@theme/components/ArticleBlock.vue";
import NavLink from '@theme/components/NavLink.vue'
export default {
  name: "Home",
  components: {
    ArticleBlock,
    NavLink
  },
  data() {
    return {
      urls: [
        "/myBlog/assets/img/item1.jpg",
        "/myBlog/assets/img/item2.jpg",
        "/myBlog/assets/img/item3.jpg",
      ],
      active: 0,
      intevalId: "",
      
      
      
      
    };
  },
  mounted() {
    console.log("list", this.$site.pages);
    
    this.item = this.$site.pages[14];
    //定时器切换轮播图
    if (this.intevalId) {
      clearInterval(this.intevalId);
    }
    this.intevalId = setInterval((item) => {
      if (this.active == this.urls.length - 1) {
        this.active = 0;
      } else {
        this.active += 1;
      }
    }, 6000);
  },
  computed: {
    
    articles() {
      const { pages } = this.$site;
      let obj = {
        //推荐文章
        recommend: {},
        // 首页文章列表，通过md文件中添加atHome: true显示
        list: []
      };
      
      pages.forEach((item) => {
        if ( item.frontmatter.atHome) {
          obj.list.push(item);
          console.log('item',item);
        }
        if(item.frontmatter.recommend) {
          obj.recommend = item;
          console.log('recommend',item);
        }
      });

      return obj;
    },
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
  
};
</script>

<style lang="stylus" >
.container {
  position: relative;
  margin-top: 3.6rem;
  padding: 0.625rem;
  height: 2000px;

  .home {
    min-width: 60rem;
    max-width: 70rem;
    margin: 1.25rem auto;

    // 轮播图
    .img_auto {
      position: relative;
      // width: 60rem;
      height: 37rem;
      border: 0.0625rem solid #eee;
      box-shadow: 0 2px 10px #eee;

      .img_item {
        position: absolute;
        // top: 0;
        // width: 60rem;
        height: 37rem;
        transition: opacity 2s;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .bullet_wrap {
        position: absolute;
        left: 50%;
        bottom: 1.25rem;
        transform: translateX(-50%);

        .bullet {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 0.4rem;
          background-color: #eee;
          margin-right: 10px;
        }

        // .bullet:nth-child(2) {
        // margin: 0 .625rem;
        // }
        .active {
          background-color: #b0bdc6;
        }
      }
    }

    // 内容
    .content {
      display: flex;
      padding: 0 3.125rem;
      margin-top: 1.875rem;
      // margin: 2.5rem auto;
      box-sizing: border-box;

      .article_wrap {
        flex: 2;

        // background-color: pink;
        .recomend {
          box-shadow: 0 3px 10px #eee;
          padding: 1.25rem;

          .picture {
            img {
              width: 100%;
              height: 18.75rem;
            }
          }

          .article_info {
            margin-top: 0.625rem;
            height: 8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .title {
              font-weight: 700;
              color: #474645;
              font-size: 1rem;
            }

            .descript {
              color: #778cbd;
              font-size: 0.75rem;
              margin: 1.25rem 0;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              text-indent: 1.5rem;
            }

            .tags {
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

        .article_list {
          margin-top: 1.25rem;
          padding: 0.625rem;
          box-shadow: 0 3px 10px #eee;
        }
      }

      .aside_info {
        flex: 1;
        margin-left: 1.3rem;
        box-shadow: 0 3px 10px #eee;
        padding: 1.25rem;

        .about_me {
          .title {
            font-weight: 700;
            color: #474645;
            font-size: 1rem;
          }

          img {
            width: 12.5rem;
            height: 12.5rem;
            margin: 1.25rem 0;
          }

          .info {
            font-size: 0.75rem;
            margin-bottom: 0.533333rem;

            .info_type {
              // margin-bottom: 0.625rem;
            }

            .description {
              color: #778cbd;
              margin: .625rem 0;
            }
            .email {
              
            }
          }
        }

        .links {
          margin-top: 0.625rem;

          .link_text {
            margin: .625rem 0;
            font-size: 700;
          }
        }
      }
    }
  }
}
.copyright {
    position: absolute;
    height: 3.125rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    line-height: 3.125rem;
    color: #666;
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
