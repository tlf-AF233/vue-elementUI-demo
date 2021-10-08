import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key = 'user'
const isLogin = 'isLogin'
export default new Vuex.Store({
  state: {
    car: [],
      user: null,
      isLogin: '0'
  },
  mutations: {
      setLogin(state, value) {
          state.isLogin = value;
          localStorage.setItem(isLogin, value)
      },

      setStorage(state, value) {
          state.user = value
          localStorage.setItem(key, JSON.stringify(value))
      },

      removeStorage (state) {
          state.user = null
          state.isLogin = '0'
          localStorage.removeItem(key)
          window.localStorage.clear()
      },

      addToShopCart(state, food) {
        // 加入购物车的方法，把菜品信息保存到store中的car上
          let haveFood = false  // 没有对应菜品
          state.car.some(item => {
            if (item.fName === food.fName) {
              item.fNum += parseInt(food.fNum)
              haveFood = true;
              return true;  // 终止后续的some循环
            }
          })
        // 如果haveFood仍然为false,表示购物车中没有这个菜品，直接push
        if (!haveFood) {
            state.car.push(food)
        }
        // 当更新car之后，把car数组存储到本地的localStorage中
        localStorage.setItem('car', JSON.stringify(state.car))
      },

      // 更新购物车
      updateCart(state, food) {
          state.car.some(item => {
              if (item.fName === food.fName) {
                  item.fNum = parseInt(food.fNum)
              }
          })
      },

      // 移出菜品
      deleteCart(state, food) {
          for (let i = 0; i < state.car.length; i++) {
              if (state.car[i].fName === food.fName) {
                  state.car.splice(i, 1);
                  break;
              }
          }
      }
  },
  actions: {
      updateCar({ commit }, food) {
          commit("updateCart", food)
      },

      deleteCar({ commit }, food) {
          commit("deleteCart", food)
      }
  },
  modules: {
  },

  getters: {

      getStorage(state) {
          if (!state.user) {
              state.user = JSON.parse(localStorage.getItem(key))
              state.isLogin = localStorage.getItem(isLogin)
          }
          return state.user
      },

      getCart(state) {
          return state.car
      },

      // 获取总价格
      getTotalPrice(state) {
          let totalPrice = 0;
          state.car.forEach(item => {
              totalPrice += item.fNum*item.fPrice
          });
          return totalPrice
      },


  }
})
