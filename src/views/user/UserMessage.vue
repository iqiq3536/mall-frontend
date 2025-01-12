<template>
  <div class="user-profile">
    <div class="user-info">
      <div class="user-name">{{ $route.params.userName }}</div>
      <router-link to="/user-edit" class="edit-profile-btn">编辑资料</router-link>
    </div>
    <div class="order-buttons">
      <router-link v-for="(order, index) in orders" :key="index" :to="`/orders/${order.label.toLowerCase()}`" class="order-button">
        <span>{{ order.label }}</span>
        <span class="order-count">{{ order.count }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '', // 初始化为空字符串
      orders: [
        { label: '代付款', count: 0 },
        { label: '代发货', count: 0 },
        { label: '待收货', count: 0 },
        { label: '待评价', count: 0 },
        { label: '退款收货', count: 0 }
      ]
    };
  },
  /*created() {
    // 模拟从登录信息中获取用户名的过程，您需要根据实际情况替换成正确的逻辑
    const loggedInUserName = '用户登录名'; // 假设这里是从登录信息中获取的用户名
    this.userName = loggedInUserName; // 将获取到的用户名赋值给userName属性
  }*/
};
</script>

<style>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}

.edit-profile-btn {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.order-buttons {
  margin-top: 20px;
  display: flex;
}

.order-button {
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.order-button:last-child {
  margin-right: 0;
}

.order-button:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>