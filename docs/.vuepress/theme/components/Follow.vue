<template>
  <div class="follow">
    <div class="text">关注我</div>
    <div class="accounts">
      <div class="way" v-for= "(item,index) in ways" :key="index">
        <a :href="item.link" target="_blank">
          <img :src="item.src" alt="" />
          <div class="name">{{item.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ways: [
        {
          name: "新浪微博",
          link:
            "https://weibo.com/u/3290035597?is_all=1",
          src: "/myBlog/assets/icons/weibo.png",
        },
        {
          name: "Github",
          link: "https://github.com/fizer19",
          src: "/myBlog/assets/icons/github.png",
        },
        {
          name: "掘金小册",
          link: "https://juejin.cn/user/720899266583527",
          src: "/myBlog/assets/icons/juejin.png",
        },
        // { name: "留言", link: "/myBlog/message/message.html", src: "/myBlog/assets/icons/message.png" },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.follow {
  width: 90%;
  margin-left: 1.5rem;
  margin-top: 2.5rem;

  .text {
    font-size: 1rem;
    height: 2.25rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #666;
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
      font-size: 0.7rem;

      img {
        width: 3rem;
        height: 3rem;
      }

      img:hover {
        transform: scale(1.2, 1.2);
      }

      .name {
        margin-top: 1rem;
        color: #778cbd;
      }
    }
  }
}
</style>