<template>
  <div class="root">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="700"
      :row-class-name="tableRowClassName"
    >
      >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div v-if="props.row.status==='封禁中'">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺头像">
                <img :src="props.row.imageUrl" alt>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.sname }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.sid }}</span>
              </el-form-item>
              <el-form-item label="店铺描述">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
              <el-form-item label="封禁开始时间">
                <span>{{ new Date(props.row.starttime * 1).toLocaleString() }}</span>
              </el-form-item>
              <el-form-item label="封禁时长">
                <span>{{ new Date(props.row.time * 1).getDay() }} 天</span>
              </el-form-item>
              <el-form-item label="封禁结束时间">
                <span>{{ new Date(props.row.endtime * 1).toLocaleString() }}</span>
              </el-form-item>
              <el-form-item label="封禁理由">
                <span>{{ props.row.reason }}</span>
              </el-form-item>
              <el-form-item label="操作人">
                <span>{{ props.row.uname }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺头像">
                <img :src="props.row.imageUrl" alt>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{ props.row.sname }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.sid }}</span>
              </el-form-item>
              <el-form-item label="店铺描述">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sid" label="ID" width="200"></el-table-column>
      <el-table-column prop="sname" label="名字" width="200"></el-table-column>
      <el-table-column prop="detail" label="描述"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <div v-if="scope.row.status==='正常'">
            <el-button @click="handleClick(scope.row)" type="text" size="small">封禁</el-button>
          </div>
          <div v-else>
            <el-button type="text" size="small" @click="cancelBan(scope.row)">取消封禁</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="封禁店铺" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="店铺名字" :label-width="formLabelWidth">
          <el-input v-model="form.sname" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封禁理由" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封禁时间" :label-width="formLabelWidth">
          <el-select v-model="form.time" placeholder="请选择封禁时间">
            <el-option label="3天" value="3"></el-option>
            <el-option label="7天" value="7"></el-option>
            <el-option label="15天" value="15"></el-option>
            <el-option label="30天" value="30"></el-option>
            <el-option label="1年" value="365"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBan">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uid: JSON.parse(localStorage.getItem('userId')),
      tableData: [
        {
          sid: '12987122',
          sname: '好滋好味鸡蛋仔',
          detail: '江浙小吃、小吃零食',
          status: '正常',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          imageUrl:
            'http://duoshoutao.oss-cn-beijing.aliyuncs.com/goods/%E5%AE%A0%E7%89%A9%E9%B2%9C%E8%8A%B1/chongw-14.jpg'
        }
      ],
      dialogFormVisible: false,
      form: {
        sid: '',
        sname: '',
        time: '',
        starttime: '',
        endtime: '',
        reason: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getStoreList () {
      this.$axios
        .get('http://localhost:8088/admin/admin/getStoreList')
        .then(res => {
          console.log(res)
          this.tableData = res.data.r
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].status === 1) {
              this.tableData[i].status = '封禁中'
              // this.tableData[i].starttime = new Date(this.tableData[i].starttime * 1).getDay
              this.tableData[i].status = '封禁中'
              this.tableData[i].status = '封禁中'
            } else {
              this.tableData[i].status = '正常'
            }
          }
        })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.status === '封禁中') {
        return 'danger-row'
      }
    },
    handleClick (...res) {
      console.log(res)
      this.dialogFormVisible = true
      this.form.sname = res[0].sname
      this.form.sid = res[0].sid
      // this.$axios.post('http://localhost:8088/admin/admin/banStore', par)
      //   .then()
    },
    confirmBan () {
      this.$confirm(`确定将${this.form.sname}封禁${this.form.time} 天吗？ `, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let par = {}
        par.sid = this.form.sid
        par.uid = this.uid
        par.reason = this.form.reason
        par.time = this.form.time
        par.starttime = new Date().getTime()
        par.endtime = new Date().getTime() + par.time * 1000 * 60 * 60 * 24
        console.log(par)
        this.$axios.post('http://localhost:8088/admin/admin/banStore', par)
          .then(res => {
            if (res.data.r === 'ok') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              setTimeout(() => {
                this.getStoreList()
                this.dialogFormVisible = false
              }, 1000)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    cancelBan (...res) {
      this.$confirm(`确定取消对${res[0].sname}的封禁吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('http://localhost:8088/admin/admin/cancelBanStore?sid=' + res[0].sid)
          .then(res => {
            if (res.data.r === 'ok') {
              this.$message({
                type: 'success',
                message: '取消封禁成功!'
              })
              this.getStoreList()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  },
  created () {
    this.getStoreList()
  }
}
</script>

<style lang="scss" scoped>
.root {
  margin-left: 240px;
  .demo-table-expand {
    font-size: 0;
  }
  /deep/ .danger-row {
    background: oldlace;
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
      width: 80px;
      border-radius: 50%;
    }
  }
}
</style>
