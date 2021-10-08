<template>
    <el-aside style="width: 140px">
        <el-menu
                router
                style="width: 120px; height: 100%"
                background-color="#0d4345"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="/food">
                <i class="el-icon-s-home"></i>
                <span slot="title">菜单</span>
            </el-menu-item>
            <el-menu-item index="/shopCart">
                <i class="el-icon-shopping-cart-full"></i>
                <span slot="title">付款</span>
            </el-menu-item>
        </el-menu>

    </el-aside>
</template>

<script>
export default {
    name: "FoodAside"
}
</script>

<style scoped>

</style>