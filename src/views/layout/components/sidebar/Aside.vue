<template>
    <el-aside width="auto" style=" background-color: #23234b; height: 100vh ">
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
</template>

<script>
export default {
    name: "Aside",
    props: ['isCollapse'],
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
    background: #161439 !important;
}

</style>