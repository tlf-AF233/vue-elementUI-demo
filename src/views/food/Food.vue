<template>
    <el-container style="height: 100%; width: 100%; padding: 0; margin: 0">
        <FoodAside></FoodAside>
        <el-container>
            <el-header>
                  <FoodHeader></FoodHeader>
            </el-header>
            <FoodApp></FoodApp>
        </el-container>
    </el-container>
</template>
<style>

</style>

<script>
import FoodAside from "@/views/food/components/sidebar/FoodAside";
import FoodHeader from "@/views/food/components/sidebar/FoodHeader";
import FoodApp from "@/views/food/components/FoodApp";
export default {
    name: 'Food',
    components: {FoodApp, FoodHeader, FoodAside},
};
</script>