<template>
  <div class="root">
    <Aside></Aside>
    <div class="content">
             <el-button type="primary">新增店铺</el-button>
        <div class="body">
            <header>
                <img src="http://duoshoutao.oss-cn-beijing.aliyuncs.com/goods/%E6%8A%A4%E8%82%A4%E7%BE%8E%E5%A6%86/meizhuang-4.jpg" alt="">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </header>
            <div class="items">
                <p>店铺名称:</p>
                <span>我的店铺</span>
            </div>
            <div class="items">
                <p>店铺描述</p>
                <span>撒地方就理解啊师傅离开</span>
            </div>
            <div class="items">
                <p>店铺收藏人数</p>
                <span>100</span>
            </div>
            <div class="items">
                <p>店铺创建时间</p>
                <span>2019-3-31</span>
            </div>
            <div class="items">
                <p>店铺销售额</p>
                <span>￥5555.00</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/aside'
export default {
  components: {
    Aside
  },
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
.root{
    margin-left: 20vw;
    .content {
        .body {
            margin-top: 20px;
            border: 1px solid #ccc;
            width: 420px;
            padding: 10px;
            box-sizing: border-box;
        }
        header {
            width: 400px;
            position: relative;
            .el-button--primary {
                position: absolute;
                top: 0;
                right: 0;
            }
            img {
                width: 100px;
            }
        }
        .items {
            width: 400px;
            display: flex;
            align-items: center;
            p {
                margin-right: 20px;
            }
            span {

            }
        }
    }
}
</style>
