<template>

        <el-header class="header">
            <div class="header-title">
                <a href="#" style="font-size: 25px;color:#909399;"><i :class="collapseIcon" @click="changeCollapse"></i></a>
            </div>
            <!-- 设置 -->
            <div class="header-menu">
                <el-menu mode="horizontal" class="header-menu-submenu">
                    <el-menu-item title="设置" index="1">
                        <i class="el-icon-setting"></i>设置
                    </el-menu-item>

                    <!-- 帮助 -->
                    <el-submenu title="帮助" index="2">
                        <template slot="title">
                            <i class="el-icon-info"></i>帮助
                        </template>
                        <el-menu-item index="2-1">
                            <router-link to="/info"  class="header-submenu-a">项目简介</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <router-link to="/author" class="header-submenu-a">作者信息</router-link>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 用户 -->
                    <el-submenu title="用户设置" index="3">
                        <template slot="title">
                            <span class="header-span">
                                <img src="@/assets/admin.jpg" width="40px" height="40px"> {{ username }}
                            </span>
                        </template>
                        <el-menu-item index="3-1" @click="exit">
                            <i class="el-icon-close"></i>退出
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-header>
</template>

<script>
export default {
    name: "Header",

    data() {
        return {
            username: 'admin',
            isCollapse: false
        }
    },

    computed: {
        collapseIcon() {
            // 如果是展开状态图标就向右，否则图标向左
            return this.isCollapse? 'el-icon-s-fold': 'el-icon-s-unfold';
        }
    },

    methods: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse
            this.$emit("changeCollapse", this.isCollapse)
        },

        /* 退出 */
        exit() {
            this.$store.commit('removeStorage')
            this.$router.push("/login")
        }
    },
}
</script>

<style scoped>

.header {
    height: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
}

.header-title {
    height: 50px;
    width: 50px;
    float: left;
    cursor: pointer;
}

.header-menu {
    height: 50px;
    width: 100%;
    flex: 1;
    line-height: 50px;
    font-size: 30px;
}

.header-menu-submenu {
    float: right;
}

.header-submenu-a {
    text-decoration: none;
    color: #4192c7;
    font-weight: bold;
    font-size: 16px;
}

.header-submenu-a:hover {
    background-color: #2c3E50;
}



.header-span {
    font-size: 20px;
}
</style>