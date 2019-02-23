<template>
  <div class="myhead">
    <div class="back">后退</div>
    <div class="title">{{ title }}</div>
    <div class="home">home</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: String
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.myhead {
  width: 100%;
  height: .8rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: .01rem solid #ccc;
  line-height: .8rem;
}
.title,.home,.back {
    height: .8rem;
  }
</style>
