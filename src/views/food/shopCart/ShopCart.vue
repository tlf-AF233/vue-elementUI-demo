<template>
    <div>
        <el-card>
        <div class="content" v-if="this.car.length > 0">
            <ul>
                <li class="header">
                    <div class="img"></div>
                    <div class="name">菜品</div>
                    <div class="price">单价</div>
                    <div class="num">数量</div>
                    <div class="total">小计</div>
                    <div class="action">操作</div>
                </li>

                <li class="list" v-for="(item, index) in car">
                    <div class="img">
                        <img v-if="item.fPicture!=null" :src="getImgUrl(item.fPicture)">
                    </div>
                    <div class="name">
                        {{item.fName}}
                    </div>
                    <div class="price">
                        {{item.fPrice}}元
                    </div>
                    <div class="num">
                        <el-input-number
                            size="small"
                            v-model="item.fNum"
                            @change="handleChange(item)"
                            :min="1"
                            ></el-input-number>
                    </div>
                    <div class="total">
                        {{item.fPrice * item.fNum}}元
                    </div>
                    <div class="action">
                        <div style="text-align: right; margin: 10px 0 0">
                            <el-button plain icon="el-icon-delete" type="danger" @click="handleDelete(item)">删除</el-button>
                        </div>
                    </div>
                </li>
            </ul>
            <div style="height: 20px; background-color: #f5f5f5"></div>

            <div class="cart-bar-right">
                <span>
                    <span class="total-price-title">合计：</span>
                    <span class="total-price">{{totalPrice}}元</span>
                </span>
                <el-button class="buy-button" plain type="danger" @click="handleBuy">去结算</el-button>
            </div>
        </div>

        <div v-else class="cart-empty">
            <div class="empty">
                <h2>您的点单还是空的！</h2>
                <p>快去点菜吧！</p>
            </div>
        </div>
        </el-card>

        <!-- 下单后的对话框 -->
        <el-dialog title="下单确认"
                   :visible.sync="buyFormVisible"
                   :close-on-click-modal="false"
                   class="buy-form">
            <el-form :model="buyForm" label-width="140px"  ref="editForm">
                <el-form-item label="请输入您的姓氏" prop="Name">
                    <el-input v-model="buyForm.uName" placeholder="可以不填"></el-input>
                </el-form-item>
                <el-form-item label="请选择您的性别" prop="uGender">
                    <el-radio v-model="buyForm.uGender" label="男">男</el-radio>
                    <el-radio v-model="buyForm.uGender" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="请告知我们您的桌号" prop="deskNo">
                    <el-input v-model="buyForm.deskNo"></el-input>
                </el-form-item>
                <el-form-item label="请告诉我们您们的就餐人数" prop="deskNum">
                    <el-input-number v-model="buyForm.deskNum" :min="1"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleCancel('buyForm')">取消</el-button>
                <el-button type="primary" @click.native="handleSuccess('buyForm')">确定支付</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "ShopCart",

    data() {
        return {
            car: [
                { fName: '' },
                { fPrice: '' },
                { fNum: '' },
                { fPicture: '' },
            ],
            totalPrice: 0,
            buyFormVisible: false,
            buyForm: {
                uName: '',
                uGender: '',
                deskNo: '',
                deskNum: ''
            },
        }
    },

    created() {
        console.log(this.$store.getters.getCart)
        this.getData()
        this.getTotal()
    },

    methods: {
        getImgUrl(url) {
            if (url !== "")
                return "http://localhost:8081/" + url
        },

        getData() {
            this.car = this.$store.getters.getCart
        },

        // 获得总价
        getTotal() {
            this.totalPrice =  this.$store.getters.getTotalPrice
        },

        // 更新数据
        handleChange(food) {
            this.$store.dispatch('updateCar', food)
            this.getData()
            this.getTotal()
        },

        // 移出商品
        handleDelete(food) {
            this.$store.dispatch('deleteCar', food)
        },

        // 下单
        handleBuy(food) {
            this.buyFormVisible = true;
        },

        // 取消对话框
        handleCancel(buyForm) {
            this.buyFormVisible = false
        },

        // 确定支付
        handleSuccess(buyForm) {
            let fd = new FormData();

            fd.append("uName", this.buyForm.uName)
            fd.append("uGender", this.buyForm.uGender)
            fd.append("deskNo", this.buyForm.deskNo)
            fd.append("deskNum", this.buyForm.deskNum)
            fd.append("billMoney", this.totalPrice)

            axios.post('http://localhost:8081/dinner', fd).then(resp => {
                this.buyFormVisible = false;
                if (resp.data.code === 1000) {
                    this.$message({
                        message: '下单成功！请耐心等待！',
                        type: 'success',
                        center: true
                    })
                } else if (resp.data.code === 3001) {
                    this.$message.error({
                        message: resp.data.data,
                        center: true
                    })
                }
            });

            axios
        }
    }
}
</script>

<style scoped>
    .content {
        width: 1225px;
        margin: 0 auto;
        background-color: #ffffff;
    }

    .content ul {
        background-color: #ffffff;
        color: #424242;
        line-height: 85px;
        list-style-type: none;    /* 去掉ul的小圆点 */
    }

    .content ul .header {
        height: 85px;
        padding-right: 10px;
        color: #424242;
    }

    .content ul .list {
        height: 85px;
        padding: 15px 26px 15px 0;
        border-top: 1px solid #e0e0e0;
    }

    .content ul .img {
        float: left;
        height: 85px;
        width: 120px;
    }

    .content ul .img img {
        height: 80px;
        width: 80px;
    }

    .content ul .name {
        float: left;
        width: 140px;
    }

    .content ul .price {
        float: left;
        width: 140px;
        padding-right: 18px;
        text-align: center;
    }

    .content ul .num {
        float: left;
        width: 140px;
        text-align: center;
    }

    .content ul .total {
        float: left;
        width: 140px;
        text-align: right;
    }

    .content ul .action {
        width: 100px;
        float: right;
        position: relative;
        right: 20px;
    }

    .content ul .action i:hover {
        color: #ff6700;
    }

    .cart-bar-right {
        float: right;
    }

    .cart-bar-right .total-price-title {
        color: #ff6700;
        font-size: 14px;
    }

    .cart-bar-right .total-price {
        color: #ff6700;
        font-size: 30px;
    }

    .buy-button {
        margin-left: 20px;
        margin-top: 10px;
    }

    .cart-empty {
        width: 1225px;
        margin: 0 auto;
    }

    .cart-empty .empty {
        height: 300px;
        padding: 0 0 130px 558px;
        margin: 65px 0 0;
        color: #b0b0b0;
        overflow: hidden;
    }

    .cart-empty .empty h2 {
        margin: 70px 0 15px;
        font-size: 36px;
    }

    .cart-empty .empty p {
        margin: 0 0 20px;
        font-size: 20px;
    }
</style>