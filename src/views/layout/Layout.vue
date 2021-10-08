<template>
    <el-container style="height: 100%; width: 100%; padding: 0; margin: 0">
        <Aside :isCollapse="foldAside"></Aside>
        <el-container>
            <el-header style="background-color: #ffffff">
              <Header @changeCollapse="isCollapse"></Header>
            </el-header>
            <AppMain></AppMain>
        </el-container>
    </el-container>
</template>

<script>
import Aside from "@/views/layout/components/sidebar/Aside";
import Header from "@/views/layout/components/sidebar/Header";
import AppMain from "@/views/layout/components/AppMain";
export default {
    name: "Layout",
    components: {AppMain, Header, Aside},
    data() {
      return {
          foldAside: false
      }
    },
    methods: {
        isCollapse(data) {
            this.foldAside = data
        }
    }
}
</script>

<style scoped>

</style>