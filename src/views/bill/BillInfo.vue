<template>
    <div>
        <el-date-picker
                v-model="input"
                @keyup.enter.native="searchHandle(input)"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchHandle(input)">搜索</el-button>
        <el-button type="success" icon="el-icon-refresh-left" @click="getData">重置</el-button>
        <el-table
                :data="tableData.slice((currentPage-1)*PageSize, currentPage*PageSize)"
                border
                style="width: 100%; height: 100%">
            <el-table-column
                    fixed
                    prop="billID"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="billMoney"
                    label="消费金额">
            </el-table-column>
            <el-table-column
                    prop="billDate"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="billdiscount"
                    label="折扣">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="showDetails(scope.row)" type="primary" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>

        <el-dialog title="账单详情"
                   :visible.sync="BillFormVisible"
                   :close-on-click-modal="false"
                   class="bill-form">
            <el-form :model="billForm" label-width="110px"  ref="editForm" >
                <el-form-item label="账单编号" prop="billID">
                    <el-input v-model="billForm.billID" readonly></el-input>
                </el-form-item>
                <el-form-item label="桌号" prop="deskNo">
                    <el-input v-model="billForm.deskNo" readonly></el-input>
                </el-form-item>
                <el-form-item label="客人" prop="user">
                    <el-input v-model="billForm.user" readonly></el-input>
                </el-form-item>
                <el-form-item label="人数" prop="deskNum">
                    <el-input v-model="billForm.deskNum" readonly>人</el-input>
                </el-form-item>
                <el-form-item label="折扣" prop="billdiscount">
                    <el-input v-model="billForm.billdiscount" readonly></el-input>
                </el-form-item>
                <el-form-item label="总金额" prop="billMoney">
                    <el-input v-model="billForm.billMoney" readonly></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="billDate">
                    <el-input v-model="billForm.billDate" readonly></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleCancel('editForm')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "BillInfo",

    data() {
      return {
          BillFormVisible: false,
          currentPage: 1,   // 默认显示第一页
          totalCount: 1,    // 总条数
          pageSizes: [5, 6, 7, 8, 9, 10],   // 个数选择器
          PageSize: 8,      // 默认每页显示的条数
          tableData: [],
          billForm: {
              billID: '',
              billMoney: '',
              billDate: '',
              billdiscount: '',
              deskNo: '',
              deskNum: '',
              user: ''
          },
          input: ''
      }
    },

    methods: {
        /* 渲染数据 */
        getData() {
            axios.get('http://localhost:8081/bills')
                .then(resp => {
                    this.tableData = resp.data.data
                    this.totalCount = resp.data.data.length
                })
        },

        /* 查看详情 */
        showDetails(row) {
            this.BillFormVisible = true
            this.billForm.billID = row.billID
            this.billForm.billMoney = row.billMoney
            this.billForm.billDate = row.billDate
            this.billForm.billdiscount = row.billdiscount
            axios.get('http://localhost:8081/bill/'+this.billForm.billID)
                .then(resp => {
                    if (resp.data.code === 1000) {
                        this.billForm.deskNo = resp.data.data.deskNo
                        this.billForm.deskNum = resp.data.data.deskNum
                        this.billForm.user = resp.data.data.uName + resp.data.data.uGender
                    }
                })

        },

        /* 取消 */
        handleCancel(billForm) {
            this.BillFormVisible = false
        },

        /* X条/页 */
        handleSizeChange(val) {
            // 改变每页显示的条数
            this.PageSize = val
            this.currentPage = 1
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
        },
        /* 翻页 */
        handleCurrentChange(val) {
            // 改变页数
            this.currentPage = val

        },

        /* 根据日期搜索 */
        searchHandle(input) {
            axios.get('http://localhost:8081/bills/'+input)
                .then(resp => {
                    console.log(resp)
                    const i = resp.data.data.length
                    if (i !== 0) {
                        this.tableData = resp.data.data
                        this.totalCount = resp.data.data.length
                    } else {
                        this.$message.error({
                            message: '该日期无账单记录！',
                        });
                    }
                })
        },
    },

    created() {
        this.getData()
    }
}
</script>

<style scoped>

</style>