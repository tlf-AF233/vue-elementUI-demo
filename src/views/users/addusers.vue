<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="姓名" prop="eName">
            <el-input v-model="ruleForm.eName" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="eGender" >
            <el-radio v-model="ruleForm.eGender" label="男">男</el-radio>
            <el-radio v-model="ruleForm.eGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="eBirth">
            <el-date-picker
                    v-model="ruleForm.eBirth"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码" prop="eTel">
            <el-input v-model="ruleForm.eTel" style="width: 300px" oninput="if (value.length>11) value=value.slice(0,11)" clearable></el-input>
        </el-form-item>
        <el-form-item label="就职日期" prop="eBirth">
            <el-date-picker
                    v-model="ruleForm.eDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="工资" prop="eSalary">
            <el-input v-model.number="ruleForm.eSalary" style="width: 300px" clearable></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                eName: '',
                eGender: '',
                eBirth: '',
                eTel: '',
                eSalary: '',
                eDate: '',
            },
            rules: {
                eName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },   // trigger 触发事件 blur：失去焦点
                    { min: 1,  message: '长度至少为2个字符', trigger: 'blur' }
                ],
                eGender: [
                    { required: true, message: '性别不能为空', trigger: 'blur' }
                ],
                eBirth: [
                    { required: true, message: '生日不能为空', trigger: 'blur' }
                ],
                eTel: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur'},
                    { min: 11, message: '手机号码位数不合法', trigger: 'blur'}
                ],
                eDate: [
                    { required: true, message: '就职日期不能为空', trigger: 'blur' }
                ],
                eSalary: [
                    { required: true, message: '工资不能为空', trigger: 'blur' },
                    { type: 'number', message: '工资必须为数字', trigger: 'blur'}
                ]
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('http://localhost:8081/employee', this.ruleForm)
                        .then(resp => {
                            console.log(resp)
                            if (resp.data.code === 1000) {
                                this.$message({
                                    message: '添加成功！',
                                    center: true
                                });
                                this.$router.push('/employees/employeeInfo')
                            }
                            else if (resp.data.code === 3001) {
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
        }
    }
}
</script>