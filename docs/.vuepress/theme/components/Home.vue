<template>
  <div class="container" >
    <meta name="referrer" content="no-referrer" />
    <main class="home">
      <div class="head">
        <!-- 轮播图 -->
        <div class="img_auto">
          <div
            class="img_item"
            :style="{ opacity: index == active ? 1 : 0 }"
            v-for="(item, index) in autoImg"
            :key="index"
          >
            <img :src="item.src" alt="图" />
          </div>
          <!-- 圆点 -->
          <div class="bullet_wrap">
            <div
              :class="index == active ? 'bullet active' : 'bullet'"
              v-for="(item, index) in autoImg"
              :key="index"
              @click="onAutoImgClick(index)"
            ></div>
          </div>
        </div>
        <div class="head_right">
          <div class="blackboard">
            <img src="/myBlog/assets/img/blackboard.png" alt="" />
            <div class="message">{{ message }}</div>
          </div>
          <!-- 关注我 -->
          <Follow />
        </div>
      </div>
      <div class="content">
        <div class="article_wrap">
          <!-- 推荐 -->
          <div class="recomend">
            <div class="corner_flag">推荐<div class="triangle"></div></div>
            <div class="picture">
              <img :src="articles.recommend.frontmatter.url" alt="" />
            </div>
            <router-link :to="articles.recommend.path" class="article_info">
              <div class="title">
                {{ articles.recommend.frontmatter.title }}
              </div>
              <div class="descript">
                {{ articles.recommend.frontmatter.description }}
              </div>
              <div class="recomend_info">
                <div class="author">
                  <div class="iconfont iconbussiness-man"></div>
                  <div class="name">
                    {{ articles.recommend.frontmatter.author }}
                  </div>
                </div>
                <div class="update_time">
                  <div class="iconfont iconclock"></div>
                  <div class="time">
                    {{ articles.recommend.frontmatter.time }}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="newest_article">最新文章</div>
          <div class="article_list">
            <div
              class="article_item"
              v-for="(item, index) in articles.list"
              :key="index"
            >
              <ArticleBlock :info="item" />
            </div>
          </div>
        </div>
        <div class="aside_info">
          <div class="about_me">
            <!-- <div class="title">关于我</div> -->
            <img src="/myBlog/assets/img/avatar.png" alt="" />
            <div class="info">
              <div class="info_type">个人资料</div>
              <div class="description">95后，双鱼座，兴趣广泛，童心未泯</div>
              <div class="email">邮箱：lifizer19@gmail.com</div>
            </div>
          </div>
          <!-- 标签 -->
          <Tags />
          <!-- 友情链接 -->
          <Links />
        </div>
      </div>
    </main>
    <div class="copyright">Copyright | 2021- by fizer</div>
  </div>
</template>

<script>
import ArticleBlock from "@theme/components/ArticleBlock.vue";
import NavLink from "@theme/components/NavLink.vue";

import Follow from "@theme/components/Follow.vue";
import Tags from "@theme/components/Tags.vue";
import Links from "@theme/components/Links.vue";

export default {
  name: "Home",
  components: {
    ArticleBlock,
    NavLink,
    Follow,
    Tags,
    Links,
  },

  data() {
    return {
      autoImg: [
        { src: "/myBlog/assets/img/bg1.jpg", link: "#" },
        { src: "/myBlog/assets/img/bg2.jpg", link: "#" },
        { src: "/myBlog/assets/img/bg3.jpg", link: "#" },
      ],
      message: "好好学习，天天向上！",
      active: 0,
      intevalId: "",

      //友情链接
      // links: [{ name: "vuepress", link: "https://www.vuepress.cn/" }],
    };
  },
  methods: {
    onAutoImgClick(index) {
      this.active = index;
      this.timer();
    },
    //定时器
    timer() {
      //定时器切换轮播图
      if (this.intevalId) {
        clearInterval(this.intevalId);
      }
      this.intevalId = setInterval((item) => {
        if (this.active == this.autoImg.length - 1) {
          this.active = 0;
        } else {
          this.active += 1;
        }
      }, 6000);
    },
  },
  mounted() {
    // console.log('site');
    this.timer();
  },
  computed: {
    articles() {
      const { pages } = this.$site;
      let obj = {
        //推荐文章
        recommend: {},
        //十篇
        list: [],
      };
      let all = [];
      pages.forEach((item) => {
        if (item.frontmatter.categories && !item.frontmatter.recommend) {
          
          all.push(item);
        }
        if (item.frontmatter.recommend) {
          obj.recommend = item;
          // console.log("recommend", item);
        }
      });
      //按时间排序，取前十篇
      all.sort(function (a, b) {
        if (a.frontmatter.time > b.frontmatter.time) {
          return -1;
        } else {
          return 1;
        }
      });
      obj.list = all.slice(0, 10);

      return obj;
    },
    // data() {
    //   return this.$page.frontmatter;
    // },

    // actionLink() {
    //   return {
    //     link: this.data.actionLink,
    //     text: this.data.actionText,
    //   };
    // },
  },
};
</script>

<style lang="stylus" scoped>
.container {
  position: relative;
  margin-top: 3.6rem;
  padding: 0.625rem;

  // height: 2000px;
  .home {
    min-width: 60rem;
    max-width: 70rem;
    margin: 2rem auto 6rem;
    background-color: #fff;

    .head {
      display: flex;
      // align-items: center;
      padding: 1.25rem;

      .img_auto {
        flex: 4;
        position: relative;
        // width: 60rem;
        height: 25rem;
        border: 0.0625rem solid #eee;
        box-shadow: 0 2px 10px #eee;

        .img_item {
          position: absolute;
          height: 25rem;
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

      // 黑板
      .head_right {
        position: relative;
        flex: 2;
        width: 23.75rem;
        height: 13.125rem;
        padding: 0 0.9375rem;

        img {
          width: 100%;
        }

        .message {
          position: absolute;
          top: 50%;
          // left: 50%;
          transform: translateY(-50%);
          padding: 0 2.25rem;
          font-family: 'STXingkai', 'SimHei', '黑体', sans-serif;
          color: #fff;
          font-size: 1.2rem;
        }
      }
    }

    // 文章和侧边信息
    .content {
      display: flex;
      // margin: 0 1.25rem;
      margin: 1.875rem 1.25rem;
      // margin: 2.5rem auto;
      box-sizing: border-box;

      .article_wrap {
        flex: 2;
        margin-bottom: 1rem;
        // background-color: pink;
        .recomend {
          position: relative;
          box-shadow: 0 3px 10px #eee;
          padding: 1.25rem;
          .corner_flag {
            position: absolute;
            left: -0.625rem;
            top: -0.375rem;
            background-color: #86b4fd;
            padding: .3125rem;
            border-radius: .3125rem;
            .triangle {
              position: absolute;
              bottom: -0.4375rem;
              left: 0;
              width: 0;
              height: 0;
              border-top: 10px solid #86b4fd;
              border-left: 10px solid transparent;
            }
          }
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

            .recomend_info {
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
        .newest_article {
          height: 3.5rem;
          line-height: 3.5rem;
          font-weight: 700;
          border-bottom: 5px solid #92eef9;
        }
        .article_list {
          margin-top: 1.25rem;
          padding: 0.625rem;
          box-shadow: 0 3px 10px #eee;
        }
      }

      .aside_info {
        flex: 1;
        margin-left: 1rem;
        // box-shadow: 0 3px 10px #eee;
        padding: 0 2.25rem;

        // 关于我
        .about_me {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 0.0625rem solid #c7e5eb;

          // }
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
              margin: 0.625rem 0;
            }

            .email {
            }
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
