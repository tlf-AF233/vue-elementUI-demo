<template>
    <el-container style="width: 100%; height: 100%;">
        <el-aside width="auto" style=" background-color: #23234b; height: 100vh">
            <el-header
            style="line-height: 60px;
                   background-color: #23234b;
                   color: #fff">
                <i class="el-icon-basketball"></i>
                <span v-show="!isCollapse"> 后台管理系统</span>
            </el-header>

            <el-menu
                     class="el-menu-vertical-demo"
                     router
                     background-color="#23234b"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     :collapse="isCollapse">
                <el-menu-item index="/homepage">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>

                <el-submenu v-for="(item, index) in $router.options.routes" :index="index+''" v-if="!item.hidden">
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path" :class="$route.path===item2.path?'is-active':''"
                    class="el-menu-item-demo">
                        <span>{{item2.name}}</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
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
                                <a href=""  class="header-submenu-a">项目简介</a>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <a href="" class="header-submenu-a">作者信息</a>
                            </el-menu-item>
                        </el-submenu>

                        <!-- 用户 -->
                        <el-submenu title="用户设置" index="3">
                            <template slot="title">
                        <span class="header-span">
                            <img src="../assets/admin.jpg" width="40px" height="40px"> {{ username }}
                        </span>
                            </template>
                            <el-menu-item index="3-1" @click="">
                                <i class="el-icon-close"></i>退出
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-header>

            <el-main style="background-color: #eeeff3">
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
export default {
    name: "Index",

    computed: {
        collapseIcon() {
            // 如果是展开状态图标就向右，否则图标向左
            return this.isCollapse? 'el-icon-s-fold': 'el-icon-s-unfold';
        }
    },

    methods: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse
        }
    },

    data() {
        return {
            isCollapse: false,
            username: 'admin'
        }
    }
}
</script>

<style scoped>

/*解决左侧子菜单展出多1px*/
.el-menu{
    border-right-width: 0;
}
.el-radio-group {
    font-size: 20px;
    line-height: 60px;
    margin-top: 20px;
    margin-left: 10px;
}
.shrinkBtn {
    position: fixed;
    left: -18px;
    top: 38px;
    color: #151d41;
    margin-left: 100px;
    transform: rotate(180deg);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-vertical-demo {
    border: none;
}

.el-menu-item-demo {
    background: black !important;
}

.header {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
}

.header-title {
    height: 50px;
    width: 50px;
    float: left;
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