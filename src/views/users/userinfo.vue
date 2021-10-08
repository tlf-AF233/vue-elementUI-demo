<template>
    <div>
        <el-input
                placeholder="请输入名字"
                prefix-icon="el-icon-search"
                v-model="input"
                @keyup.enter.native="searchHandle(input)"
                style="width: 200px"
                required>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchHandle(input)">搜索</el-button>
        <el-button type="success" icon="el-icon-refresh-left" @click="getData">重置</el-button>
        <el-table
            v-loading="loading"
            :data="tableData.slice((currentPage-1)*PageSize, currentPage*PageSize)"
            border
            style="width: 100%; height: 100%">
        <el-table-column
                fixed
                prop="eId"
                label="编号">
        </el-table-column>
        <el-table-column
                prop="eName"
                label="姓名">
        </el-table-column>
        <el-table-column
                prop="eGender"
                label="性别">
        </el-table-column>
        <el-table-column
                prop="eBirth"
                label="生日">
        </el-table-column>
        <el-table-column
                prop="eTel"
                label="手机号码">
        </el-table-column>
        <el-table-column
                prop="eDate"
                label="就职日期">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作">
            <template slot-scope="scope">
                <el-button @click="showEdit(scope.row)" type="primary" size="small">编辑</el-button>
                <el-button @click="showDelete(scope.row)" type="danger" size="small">删除</el-button>
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

        <el-dialog title="编辑数据"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   class="edit-form">
            <el-form :model="editForm" label-width="80px"  ref="editForm">
                <el-form-item label="姓名" prop="eName">
                    <el-input v-model="editForm.eName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="eGender">
                    <el-input v-model="editForm.eGender"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="eBirth">
                    <el-date-picker
                            v-model="editForm.eBirth"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="就职日期" prop="eDate">
                    <el-date-picker
                            v-model="editForm.eDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleCancel('editForm')">取消</el-button>
                <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>


export default {
    methods: {
        /* 渲染数据 */
        getData() {
            axios.get('http://localhost:8081/employee')
                    .then(resp => {
                        this.tableData = resp.data.data
                        this.totalCount = resp.data.data.length
                    })
            this.loading = false
        },
        /* 删除事件 */
        showDelete(row) {
            this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete('http://localhost:8081/employee/'+row.eId)
                        .then(resp => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData()
                        })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        /* 编辑按钮事件 */
        showEdit(row) {
            this.editFormVisible = true
            this.editForm = row
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
        /* 编辑按钮取消事件 */
        handleCancel(editForm) {
            this.editFormVisible = false
        },

        /* 编辑按钮确定事件 */
        handleUpdate(editForm) {
            axios.put('http://localhost:8081/employee', {
                eId: this.editForm.eId,
                eName: this.editForm.eName,
                eBirth: this.editForm.eBirth,
                eGender: this.editForm.eGender,
                eTel: this.editForm.eTel,
                eDate: this.editForm.eDate
            })
                .then(resp => {
                    console.log(this.editForm.eBirth)
                    this.editFormVisible = false
                    if (resp.data.code === 1000) {
                        this.$message({
                            message: '修改成功！',
                            type: 'success',
                            center: true
                        });
                    }
                })
        },

        /* 查询按钮事件 */
        searchHandle(input) {
            if (input === null || input === '') {
                this.$message({
                    message: '输入不能为空！',
                    type: 'warning'
                });
            } else {
                axios.get('http://localhost:8081/employee/'+input)
                    .then(resp => {
                        const i = resp.data.data.length
                        if (i !== 0) {
                            this.tableData = resp.data.data
                            this.totalCount = resp.data.data.length
                        } else {
                            this.$message.error({
                                message: '查无此人！',
                            });
                        }
                    })
            }
        },

    },
    created() {
        this.getData()
    },
    data() {
        return {
            editFormVisible: false,
            queryFormVisible: false,
            currentPage: 1,   // 默认显示第一页
            totalCount: 1,    // 总条数，根据接口获取数据长度
            pageSizes: [5, 6, 7, 8, 9, 10],  // 个数选择器
            PageSize: 8,         // 默认每页显示的条数
            tableData: [],
            editForm: {
                eId: '',
                eName: '',
                eGender: '',
                eBirth: '',
                eTel: '',
                eDate: ''
            },
            loading: true,
            input: '',
        }
    }

}
</script>

<style>
/*解决表格未对齐*/
body .el-table th.gutter {
    display: table-cell !important
}
</style>