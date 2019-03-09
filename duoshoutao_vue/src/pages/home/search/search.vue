<template>
  <div class="root">
    <van-tabs v-model="active">
      <van-tab title="综合"></van-tab>
      <van-tab title="价格升序"></van-tab>
      <van-tab title="价格降序"></van-tab>
      <van-tab title="筛选"></van-tab>
    </van-tabs>
    <van-card num="2" tag="标签" price="2.00" desc="描述信息" title="商品标题" :thumb="imageURL"/>
    <div
          slot="tags"
          class="card__tags"
        >
          <van-tag
            plain
            type="danger"
          >
            标签1
          </van-tag>
          <van-tag
            plain
            type="danger"
          >
            标签2
          </van-tag>
        </div>
        <div
          slot="footer"
          class="card__footer"
        >
        </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      imageURL: 'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root {
    .card__footer {
    padding-top: 10px;
  }
  .card__tags {
    .van-tag {
      margin-right: 5px;
    }
  }
}
</style>
