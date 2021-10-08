<template>
    <div>
        <el-input
                placeholder="请输入菜品名"
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
                    prop="fId"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="fName"
                    label="名称">
            </el-table-column>
            <el-table-column
                    prop="fPrice"
                    label="价格">
            </el-table-column>
            <el-table-column
                    prop="fPicture"
                    label="图片">
                <template slot-scope="scope">
                    <el-image style="width: 30px; height: 30px" :src="getImgUrl(scope.row.fPicture)" :preview-src-list="[getImgUrl(scope.row.fPicture)]">
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </template>
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
            <el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
                <el-form-item label="名称" prop="fName">
                    <el-input v-model="editForm.fName"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="fPrice">
                    <el-input v-model.number="editForm.fPrice"></el-input>
                </el-form-item>
                <el-form-item label="菜品图片" prop="fPicture">
                    <el-upload
                            class="upload-demo"
                            drag
                            ref="upload"
                            action="http://localhost:8081/upload"
                            :http-request="httpRequest"
                            name="fPicture"
                            accept=".jpg,.jpeg,.png"
                            :auto-upload="false"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-change="getFile">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
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
    name: 'Dishback',

    methods: {
        /* 渲染数据 */
        getData() {
            axios.get('http://localhost:8081/foods')
            .then(resp => {
                this.tableData = resp.data.data
                this.totalCount = resp.data.data.length
            })
            this.loading = false
        },
        /* 删除事件 */
        showDelete(row) {
            this.$confirm('此操作将永久删除该菜品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete('http://localhost:8081/food/'+row.fId)
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
            this.$refs[editForm].validate((valid) => {
                if (valid) {
                    this.fd = new FormData()
                    this.$refs.upload.submit()
                    this.fd.append("fId", this.editForm.fId)
                    this.fd.append('fName', this.editForm.fName)
                    this.fd.append('fPrice', this.editForm.fPrice)

                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    axios.put('http://localhost:8081/food', this.fd, config)
                    .then(resp => {
                        if (resp.data.code === 1000) {
                            this.$message({
                                message: '修改成功！',
                                type: 'success',
                                center: true
                            });
                            this.getData()
                        } else {
                            this.$message.error({
                                message: resp.data.data,
                                center: true
                            })
                        }
                    })

                } else {
                    return false;
                }
            });
        },

        /* 查询按钮事件 */
        searchHandle(input) {
            if (input === null || input === '') {
                this.$message({
                    message: '输入不能为空！',
                    type: 'warning'
                });
            } else {
                axios.get('http://localhost:8081/food/'+input)
                .then(resp => {
                    const i = resp.data.data.length
                    if (i !== 0) {
                        this.tableData = resp.data.data
                        this.totalCount = resp.data.data.length
                    } else {
                        this.$message.error({
                            message: '没有该菜品！',
                        });
                    }
                })
            }
        },

        getImgUrl(url) {
            if (url !== "")
                return "http://localhost:8081/" + url
        },

        getFile(file, fileList) {

        },

        // 文件上传失败
        uploadError() {
            this.$message.error({
                message: "文件上传失败！",
                center: true
            })
        },

        // 文件上传成功
        uploadSuccess(res, file) {
            console.log(res)
        },

        // 自定义上传方法
        httpRequest(param) {
            const fileObj = param.file
            this.fd.append('fPicture', fileObj)
        },

    },
    created() {
        this.getData()
    },
    data() {
        return {
            editFormVisible: false,
            currentPage: 1,   // 默认显示第一页
            totalCount: 1,    // 总条数，根据接口获取数据长度
            pageSizes: [5, 6, 7, 8, 9, 10],  // 个数选择器
            PageSize: 8,         // 默认每页显示的条数
            tableData: [],
            fd: {},   // 向后端进行传递的参数
            editForm: {
                fId: '',
                fName: '',
                fPrice: '',
                fPicture: '',
            },
            rules: {
                fName: [
                    { required: true, message: '请输入菜品名称', trigger: 'blur' },
                ],
                fPrice: [
                    { required: true, message: '请输入菜品价格', trigger: 'blur' },
                    { type: 'number', message: '菜品价格必须为数字', trigger: 'blur' }
                ],
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