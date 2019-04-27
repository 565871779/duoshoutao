<template>
  <div class="root">
    <Aside @clickTab="refresh"></Aside>
    <div class="content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="700"
        :row-class-name="tableRowClassName"
      >
        >
        <el-table-column fixed prop="id" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="date" label="下单时间" width="200"></el-table-column>
        <el-table-column prop="uname" label="下单用户" width="120"></el-table-column>
        <el-table-column prop="gname" label="购买商品" width="100"></el-table-column>
        <el-table-column prop="num" label="购买数量" width="100"></el-table-column>
        <el-table-column prop="total" label="交易金额" width="100"></el-table-column>
        <el-table-column prop="phone" label="用户手机号" width="120"></el-table-column>
        <el-table-column prop="status" label="支付状态" width="120"></el-table-column>
        <el-table-column prop="address" label="收货地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.status==='已支付'">
              <el-button @click="handleClick(scope.row)" type="text" size="small">发货</el-button>
              <el-button type="text" size="small" @click="cancelClick(scope.row)">取消订单</el-button>
            </div>
            <div v-else-if="scope.row.status==='已收货'">
              <el-button type="text" size="small">查看订单</el-button>
            </div>
            <div v-else-if="scope.row.status==='已取消'">
              已取消
            </div>
            <div v-else>
              <el-button type="text" size="small">查看订单</el-button>
              <el-button type="text" size="small" @click="cancelClick(scope.row)">取消订单</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <span>您确定已经发货了吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeStutas">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="cancelDialogVisible" width="30%" center>
        <span>您确定取消订单吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confiremCancel">确 定</el-button>
        </span>
      </el-dialog>
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
      uid: JSON.parse(localStorage.getItem('userId')),
      tableData: [],
      sid: this.$route.query.sid,
      centerDialogVisible: false,
      cancelDialogVisible: false,
      oid: ''
    }
  },
  computed: {},
  methods: {
    getOrderInfo () {
      this.$axios
        .get('http://localhost:8088/admin/store/getOrderInfo?sid=' + this.sid)
        .then(res => {
          console.log(res)
          let data = res.data.r
          this.tableData = data
          for (let i = 0; i < data.length; i++) {
            this.tableData[i].date = new Date(
              data[i].submitTime * 1
            ).toLocaleString()
            this.tableData[i].uname = data[i].uname
            this.tableData[i].gname = data[i].gname
            this.tableData[i].num = data[i].num
            this.tableData[i].total = data[i].price * data[i].num
            this.tableData[i].status =
              data[i].status === 0
                ? '未支付'
                : data[i].status === 1
                  ? '已支付'
                  : data[i].status === 4
                    ? '已发货'
                    : data[i].status === 5
                      ? '已收货'
                      : data[i].status === 6
                        ? '已取消'
                        : ''
            this.tableData[i].address = data[i].detailadd + data[i].saddress
            this.tableData[i].id = data[i].submitTime
          }
        })
    },
    refresh () {
      this.sid = this.$route.query.sid
      this.getOrderInfo()
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.status === '已支付') {
        return 'warning-row'
      } else if (row.status === '已收货') {
        return 'success-row'
      }
      return ''
    },
    handleClick (...res) {
      this.centerDialogVisible = true
      this.oid = res[0].oid
    },
    cancelClick (...res) {
      this.cancelDialogVisible = true
      this.oid = res[0].oid
    },
    changeStutas () {
      this.$axios.get('http://localhost:8088/admin/order/confirmlOrder?oid=' + this.oid)
        .then(res => {
          console.log(res)
          if (res.data.r === 'ok') {
            this.$message({
              message: '发货成功！',
              type: 'success'
            })
            this.getOrderInfo()

            this.centerDialogVisible = false
          } else {
            this.$message.error('发货失败！')
          }
        })
    },
    confiremCancel () {
      this.$axios.get('http://localhost:8088/admin/order/cancelOrder?oid=' + this.oid)
        .then(res => {
          console.log(res)
          if (res.data.r === 'ok') {
            this.$message({
              message: '取消订单成功！',
              type: 'success'
            })
            this.getOrderInfo()

            this.cancelDialogVisible = false
          } else {
            this.$message.error('取消订单失败！')
          }
        })
    }
  },
  mounted () {
    this.getOrderInfo()
  }
}
</script>
<style lang="scss" scoped>
/deep/ .warning-row {
  background: oldlace;
}

/deep/ .success-row {
  background: #f0f9eb;
}
.root {
  margin-left: 15vw;
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
