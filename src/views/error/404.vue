<template>
   <div>
    <div class="sgt">
        <img src="@/assets/404.jpg" width="600px" height="600px" onload="loading"/>
    </div>
    <div class="bullshit">
    <div class="bullshit__oops">糟糕！</div>
    <div class="bullshit__headline">页面找不到了...</div>
    <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页</div>
    <a href="/" class="bullshit__return-home">返回首页</a>
</div>
   </div>
</template>

<script>
export default {
    name: "Error",

    methods: {
        loading() {
            window.onload
        }
    }
}
</script>

<style scoped>
 .sgt {
     float: left;
     position: relative;
     width: 600px;
     margin: 20px 20px 20px 50px;
     overflow: hidden;
 }
 .bullshit {
     position: relative;
     float: left;
     margin-top: 200px;
     width: 300px;
     overflow: hidden;
 }
 .bullshit__oops {
         font-size: 32px;
         font-weight: bold;
         line-height: 40px;
         color: #f31436;
         margin-bottom: 20px;
         animation-name: slideUp;
         animation-duration: 0.5s;
         animation-fill-mode: forwards;
 }
 .bullshit__headline {
         font-size: 20px;
         line-height: 24px;
         color: #f31436;
         margin-bottom: 10px;
         animation-name: slideUp;
         animation-duration: 0.5s;
         animation-delay: 0.1s;
         animation-fill-mode: forwards;
 }
 .bullshit__info {
         font-size: 13px;
         line-height: 21px;
         color: grey;
         margin-bottom: 30px;
         animation-name: slideUp;
         animation-duration: 0.5s;
         animation-delay: 0.2s;
         animation-fill-mode: forwards;
 }
 .bullshit__return-home {
         display: block;
         float: left;
         width: 110px;
         height: 36px;
         background: #f31436;
         border-radius: 100px;
         text-align: center;
         color: #ffffff;
         font-size: 14px;
         line-height: 36px;
         cursor: pointer;
         animation-name: slideUp;
         animation-duration: 0.5s;
         animation-delay: 0.3s;
         animation-fill-mode: forwards;
 }

</style>