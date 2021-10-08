<template>
    <div>
        <el-row>
            <el-col :span="6" v-for="item in dish" >
                <el-card>
                    <img v-if="item.fPicture!=null" :src="getImgUrl(item.fPicture)" width="220px" height="160px">
                    <div style="padding: 14px;">
                        <span class="food-name">{{item.fName}}</span>
                        <span class="food-price">{{item.fPrice}} 元</span>
                        <div class="bottom-clearfix">
                            <el-input-number v-model="item.fNum" size="small" :min="0"></el-input-number>
                            <el-button type="primary" class="button" @click="addShopCart(item.fName, item.fPrice, item.fPicture, item.fNum)">点餐</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination
                @current-change="currentChange"
                layout="prev, pager, next"
                :current-page="current"
                :page-size="size"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "DishInfo",

    data() {
        return {
            dish: [
                { fName: ''},
                { fPrice: ''},
                { fPicture: ''},
                { fNum: 0 },
            ],
            current: 1,  // 默认显示第一页
            size: 6,     // 默认一页显示6条
            total: 1,    // 总记录， 从后端接口获取
        }
    },

    created() {
        // 请求后台接口获得总记录
        axios.get('http://localhost:8081/food')
            .then(resp => {
                this.total = resp.data.data
            });

        // 获得分页记录
        this.getData(this.current, this.size)
    },

    methods: {
        getImgUrl(url) {
            if (url !== "")
                return "http://localhost:8081/" + url
        },

        getData(current, size) {
            axios.get('http://localhost:8081/food/'+current+'/'+size)
                .then(resp => {
                    console.log(resp)
                    this.dish = resp.data.data
                })
        },

        // 改变页数
        currentChange(val) {
            this.current = val
            this.getData(val, this.size)
        },

        // 加入购物车
        addShopCart(fName, fPrice, fPicture, fNum) {
            if (isNaN(fNum)) {
                this.$message.error({
                    message: '请选择份量',
                    center: true,
                })
            } else {
            const food = {
                fName: fName,
                fPrice: fPrice,
                fPicture: fPicture,
                fNum: fNum
            }
            // 调用store中的mutations来将菜品加入购物车
            this.$store.commit("addToShopCart", food)
        }
            }
    },

}
</script>

<style scoped>

    .el-col {
        margin: 30px;
    }

    .food-name {
        color: blue;
        position: relative;
        left: 20px;
    }

    .food-price {
        position: relative;
        top: 30px;
        right: 30px;
        color: red;
    }

    .bottom-clearfix {
        margin-top: 50px;
        float: right;
        padding-bottom: 10px;;
    }

    .button {
        margin-top: 10px;
        margin-left: 25px;
    }

</style>