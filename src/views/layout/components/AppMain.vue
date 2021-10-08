<template>
    <el-main style="background-color: #eeeff3">
        <el-card class="card" shadow="hover">
            <router-view></router-view>
        </el-card>
    </el-main>
</template>

<script>
export default {
    name: "AppMain"
}
</script>

<style scoped>
.card {
    height: auto;
}
</style>