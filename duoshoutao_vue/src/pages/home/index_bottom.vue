<template>
  <div class="bottom">
      <div class="buttons">
          <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
          <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
           <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
           <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
           <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
           <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
           <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
           <div class="item">
              <div class="button">
                  促
              </div>
              <p>促销卖场</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.bottom{
    width: 100%;
    .buttons {
        height: 2.5rem;
        display: flex;
        flex-wrap: wrap;
        padding: .4rem;
        justify-content: space-between;
    }
    .item {
        width: 21%;
        height: 1.2rem;
        margin-top: .5rem;
        margin-bottom: .3rem;
        .button {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #ccc;
            margin-right: .4rem;
        }
        p {
            margin-top: .2rem;
            margin-left: .1rem;
        }
    }
}
</style>
