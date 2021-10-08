<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="菜品名称" prop="fName">
        <el-input v-model="ruleForm.fName"></el-input>
    </el-form-item>

    <el-form-item label="菜品价格" prop="fPrice">
        <el-input v-model.number="ruleForm.fPrice"></el-input>
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

    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

    </el-form>
</template>
<script>
export default {
    name: 'AddDish',

    data() {
        return {
            ruleForm: {
                fName: '',
                fPrice: '',
            },
            fd: {},   // 向后端进行传递的参数
            rules: {
                fName: [
                    { required: true, message: '请输入菜品名称', trigger: 'blur' },
                ],
                fPrice: [
                    { required: true, message: '请输入菜品价格', trigger: 'blur' },
                    { type: 'number', message: '菜品价格必须为数字', trigger: 'blur' }
                ],
            },
        };
    },

    methods: {

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

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.fd = new FormData()

                    this.$refs.upload.submit()
                    if (this.fd.get('fPicture') === null) {
                        this.$message.error({
                            message: '请上传图片！',
                            center: true,
                        })
                        return
                    }
                    this.fd.append('fName', this.ruleForm.fName)
                    this.fd.append('fPrice', this.ruleForm.fPrice)

                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    axios.post('http://localhost:8081/upload', this.fd, config)
                        .then(resp => {
                            console.log(resp)
                            if (resp.data.code === 1000) {
                                this.$message({
                                    message: '添加成功！',
                                    type: 'success',
                                    center: true
                                });
                                this.resetForm(formName)
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

        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$refs.upload.clearFiles()
        }
    }
}
</script>