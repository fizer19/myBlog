<template>
  <div class="container">
    <main class="home">
      <div class="head">
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
        <div class="head_right">
          <div class="blackboard">
            <img src="/myBlog/assets/img/blackboard.png" alt="" />
          </div>
          <div class="follow">
            <div class="text">关注我</div>
            <div class="accounts">
              <a
                href="https://weibo.com/3290035597/profile?topnav=1&wvr=6&is_all=1#1610887982317"
                target="_blank"
              >
                <img src="/myBlog/assets/icons/weibo.png" alt="" />
                <div class="name">新浪微博</div>
              </a>
              <a
                href="https://github.com/fizer19"
                target="_blank"
              >
                <img src="/myBlog/assets/icons/github.png" alt="" />
                <div class="name">Github</div>
              </a>
              <a
                href="#"
                target="_blank"
              >
                <img src="/myBlog/assets/icons/message.png" alt="" />
                <div class="name">留言</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="article_wrap">
          <div class="recomend">
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
              <div class="tags">
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
            <div class="title">关于我</div>
            <img src="/myBlog/assets/img/avatar.png" alt="" />
            <div class="info">
              <div class="info_type">个人资料</div>
              <div class="description">95后，双鱼座，兴趣广泛，童心未泯</div>
              <div class="email">邮箱：fizer19@gmail.com</div>
            </div>
          </div>
          <!-- 标签 -->
          <div class="tags">
            <router-link
              :to="item.link"
              class="tag"
              v-for="(item, index) in tags"
              :key="index"
              :style="{ background: `${tagColor[index]}` }"
              >{{ item.name }}</router-link
            >
          </div>
          <div class="links">
            <div class="link_text">友情连接</div>
            <a href="https://www.vuepress.cn/">vuepress</a>
          </div>
        </div>
      </div>
    </main>
    <div class="copyright">Copyright | 2021- by fizer</div>
  </div>
</template>

<script>
import ArticleBlock from "@theme/components/ArticleBlock.vue";
import NavLink from "@theme/components/NavLink.vue";
export default {
  name: "Home",
  components: {
    ArticleBlock,
    NavLink,
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
      tags: [
        {
          name: "首页",
          link: "/",
        },
        {
          name: "教程",
          link: "/tutorial/",
        },
        {
          name: "随笔",
          link: "/essay/",
        },
        {
          name: "前端",
          link: "/technology/fontend.html",
        },
        {
          name: "关于我",
          link: "//",
        },
        {
          name: "神秘世界",
          link: "//",
        },
      ],
      tagColor: [
        "#f2fddb",
        "#92eef9",
        "#fff5fa",
        "#f2faff",
        "#fff9ed",
        "#fffff7",
      ],
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
        list: [],
      };

      pages.forEach((item) => {
        if (item.frontmatter.atHome) {
          obj.list.push(item);
          console.log("item", item);
        }
        if (item.frontmatter.recommend) {
          obj.recommend = item;
          console.log("recommend", item);
        }
      });

      return obj;
    },
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      };
    },
  },
};
</script>

<style lang="stylus" >
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
        height: 27rem;
        border: 0.0625rem solid #eee;
        box-shadow: 0 2px 10px #eee;

        .img_item {
          position: absolute;
          // top: 0;
          // width: 60rem;
          height: 27rem;
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
        flex: 2;
        padding: 0.9375rem;

        img {
          width: 100%;
        }

        .follow {
          width: 90%;
          margin-left: 1.5rem;
          margin-top: 1.5rem;
          .text {
            font-size: 1.125rem;
            height: 2.25rem;
            line-height: 2.25rem;
            font-weight: 700;
            color: #666
            // margin-left: 1rem;
          }

          .accounts {
            border-top: 0.125rem solid #eee;
            padding: 1.5rem 0;
            display: flex;
            // justify-content: center;
            a {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-right: 2rem;
              font-size: 0.8rem;

              img {
                width: 3.5rem;
                height: 3.5rem;
              }

              .name {
                margin-top: 0.3125rem;
              }
            }
          }
        }
      }
    }

    // 内容
    .content {
      display: flex;
      margin: 0 1.25rem;
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
        padding: 2.25rem;

        // 关于我
        .about_me {
          .title {
            font-weight: 700;
            // color: #474645;
            font-size: 1.125rem;
            color: #666;
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
              margin: 0.625rem 0;
            }

            .email {
            }
          }
        }

        // 标签
        .tags {
          margin: 1.875rem 0;
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;

          .tag {
            width: 3.125rem;
            background-color: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.625rem;
            margin-bottom: 0.625rem;
            font-size: 0.75rem;
          }

          .tag:hover {
          }
        }

        // 链接
        .links {
          margin-top: 0.625rem;

          .link_text {
            margin: 0.625rem 0;
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
