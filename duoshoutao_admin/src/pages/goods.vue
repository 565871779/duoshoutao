<template>
  <div class="root">
    <Aside @clickTab="refresh"></Aside>
    <div class="content">
      <el-button type="primary" @click="toEdit">新增商品</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品图片">
                <img :src="props.row.imageUrl" alt="">
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.gname }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.gid }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.sid }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.classify }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.details }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="gid"></el-table-column>
        <el-table-column label="商品名称" prop="gname"></el-table-column>
        <el-table-column label="描述" prop="details"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      sid: this.$route.query.sid,
      tableData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ]
    }
  },
  computed: {},
  methods: {
    getStoreInfo () {
      this.$axios
        .get('http://localhost:8088/admin/store/getGoodsInfo?sid=' + this.sid)
        .then(res => {
          console.log(res)
          this.tableData = res.data.r
        })
    },
    refresh (id) {
      this.sid = this.$route.query.sid
      this.getStoreInfo()
    },
    toEdit () {
      this.$router.push('/goodsEdit?sid=' + this.sid)
    },
    handleEdit (ind, row) {
      this.$router.push('/goodsEdit?sid=' + this.sid + '&gid=' + row.gid)
    },
    handleDelete (ind, row) {
      this.$confirm('确定删除商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('http://localhost:8088/admin/store/deleteGoods?gid=' + row.gid)
          .then((res) => {
            if (res.data.r === 'ok') {
              this.$message({
                type: 'success',
                message: '删除商品成功!'
              })
              this.getStoreInfo()
            } else {
              this.$message.error('删除商品失败!')
            }
          })
      })
    }
  },
  watch: {
  },
  mounted () {
    this.getStoreInfo()
  }
}
</script>
<style lang="scss" scoped>
.root {
  .el-button--primary {
    margin: 30px;
  }
  .content {
    margin-left: 15vw;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form-item__content {
      img {
          width: 8vw;
      }
  }
}
</style>
