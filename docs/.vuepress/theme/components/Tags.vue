<template>
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
</template>

<script>
export default {
  data() {
    return {
      //标签
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
};
</script>

<style  lang="stylus" scoped>
.tags {
  margin: 1.875rem 0;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border: 0.0625rem solid #c7e5eb;
  padding-top: 0.625rem;

  // padding: .9375rem;
  .tag {
    width: 3.125rem;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 0.75rem;
    color: #666;
  }

  .tag:hover {
    font-weight: 700;
    font-size: 0.75rem;
  }
}
</style>