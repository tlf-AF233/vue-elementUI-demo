<template>
    <div class="login-wrapper">
        <div class="login-content">
            <div class="login-main">
                <h3 class="login-main-title">后台管理系统</h3>
                <el-form
                :model="loginForm"
                :rules="loginRules"
                :ref="loginForm"
                @keyup.enter.native="loginFormSubmit(loginForm)">
                    <el-form-item prop="username">
                        <el-input
                        v-model="loginForm.username"
                        placeholder="用户名"
                        prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="密码"
                        prefix-icon="el-icon-key"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                        type="primary"
                        @click="loginFormSubmit(loginForm)"
                        class="login-btn-submit">登录</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',

        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: {
                        required: true, message: '用户名不能为空', trigger: 'blur'
                    },
                    password: {
                        required: true, message: '密码不能为空', trigger: 'blur'
                    }
                },
                fd: []
            }
        },

        methods: {
            // 登录提交
            loginFormSubmit(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.fd = new FormData()
                        this.fd.append("username", this.loginForm.username)
                        this.fd.append("password", this.loginForm.password)
                        axios.post('http://localhost:8081/login', this.fd)
                                .then(resp => {
                                    console.log(resp)
                                    if (resp.data.code === 1000) {
                                        this.$store.commit('setStorage', {user: this.loginForm.username})
                                        this.$store.commit('setLogin', '1')
                                        this.$router.push('/homepage')
                                    } else {
                                        this.$message.error({
                                            message: resp.data.msg,
                                            center: true
                                        });
                                    }
                                })
                    } else {
                        return false;
                    }
                });
            }
        },

    }
</script>

<style>
    .login-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        background-color: rgba(38, 50, 56, .6);
        background-size: 100% 100%;
    }

    .login-content {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        height: 300px;
        width: 400px;
        background-color: #112234;
        opacity: .8;
    }

    .login-main {
        color: beige;
        padding: 20px 20px 10px 20px;
    }

    .login-main-title {
        text-align: center;
    }

    .login-btn-submit {
        padding: 10px;
    }
</style>
