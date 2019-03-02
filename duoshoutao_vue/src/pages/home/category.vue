<template>
  <div class="root">
      <div class="left">
        <div v-for="(item, index) in 10" @click="choseClassfy(index)" :class="{checked: chosedInd === index}" :key="index">
          全球购
        </div>
      </div>
      <div class="right">
          <div class="head">
          </div>
          <div class="bottom">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      chosedInd: 0
    }
  },
  computed: {},
  methods: {
    choseClassfy (ind) {
      this.chosedInd = ind
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.root{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    .left {
      width: 25vw;
      max-height: 100vh;
      overflow: scroll;
      div {
        height: 12.3%;
        border-bottom: 1px solid #333;
        width: 100%;
        text-align: center;
        line-height: 12.3vh;
        color: #666;
        background: #d6d6d6;
        font-weight: bold;
        font-size: .34rem
      }
      .checked {
        background: #fff;
        color: orangered;
      }
    }
    .right {
      width: 75vw;
      .head {
        width: 100%;
        height: 2.5rem;
        background: red;
      }
      .bottom {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.2rem;
      .item {
          width: 42%;
          background: orangered;
          height: 2.5rem;
          margin: .2rem
        }
      }
    }
}
</style>
