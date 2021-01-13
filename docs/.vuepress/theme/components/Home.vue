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
          <div class="recomend">
            <div class="picture">
              <img src="/myBlog/assets/img/article1.png" alt="" />
            </div>
            <div class="article_info">
              <div class="title">文章标题</div>
              <div class="descript">文章描述</div>
              <div class="tags">
                <div class="author">
                  <div class="iconfont iconbussiness-man"></div>
                  <div class="name">梨先生</div>
                </div>
                <div class="update_time">
                  <div class="iconfont iconclock"></div>
                  <div class="time">2021-1-13</div>
                </div>
              </div>
            </div>
          </div>
          <div class="article_list">
            <div class="article_item">
              <ArticleBlock :info="item" />
            </div>
            <div class="article_item">
              <ArticleBlock :info="item" />
            </div>
          </div>
        </div>
        <div class="aside_info"></div>
      </div>
    </main>
  </div>
</template>

<script>
import ArticleBlock from "@theme/components/ArticleBlock.vue";
export default {
  name: "Home",
  components: {
    ArticleBlock
  },
  data() {
    return {
      urls: [
        "/myBlog/assets/img/item1.jpg",
        "/myBlog/assets/img/item2.jpg",
        "/myBlog/assets/img/item3.jpg",
      ],
      active: 0,
      inteval: "",
      item: ""
    };
  },
  mounted() {
    console.log('list',this.$site.pages);
    this.item = this.$site.pages[14]
    //定时器切换轮播图
    if (this.inteval) {
      clearInterval(this.inteval);
    }
    this.inteval = setInterval((item) => {
      if (this.active == this.urls.length - 1) {
        this.active = 0;
      } else {
        this.active += 1;
      }
    }, 6000);
  },
  
};
</script>

<style lang="stylus">
.container {
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
          padding: .625rem;
          box-shadow: 0 3px 10px #eee;
        }
      }

      .aside_info {
        flex: 1;
        margin-left: 1.3rem;
        height: 300px;
        background-color: blue;
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
