<template>
    <el-header class="header">
        <div class="header-title">
            欢迎来到AF饭店
        </div>
        <div class="back">
            <el-menu mode="horizontal" class="header-back">
                <el-menu-item title="后台">
                    <router-link to="/back"><i class="el-icon-basketball"></i>后台</router-link>
                </el-menu-item>
            </el-menu>
        </div>
    </el-header>
</template>

<script>
export default {
    name: "FoodHeader"
}
</script>

<style scoped>
    .header {
        height: 100px;
        width: 100%;

    }

    .header-title {
        height: 100px;
        float: left;
        font-size: 40px;
        font-family: 楷体,serif;
        color: #151d41;
        cursor: pointer;
    }

    .back {
        height: 100px;
        width: 100%;
        flex: 1;
        line-height: 100px;
        font-size: 40px;
    }

    .header-back {
        float: right
    }
</style>