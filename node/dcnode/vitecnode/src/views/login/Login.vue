<template>
  <div class="login-container">
    <div class="backlogin">
      <div class="login_box">
        <div class="title">VUE3-EXPRESS-CNODE</div>
        <div>
          <input
            class="myinput"
            type="text"
            placeholder="用户名"
            v-model="state.userName"
          />
        </div>
        <div>
          <input
            @keyup.enter="login"
            class="myinput"
            type="password"
            placeholder="口令"
            v-model="state.password"
          />
        </div>
        <button
          v-show="toLoginFlag"
          :disabled="state.disablebtn"
          class="login"
          @click="login"
        >
          登录
        </button>
        <button
          v-show="!toLoginFlag"
          :disabled="state.disablebtn"
          class="login register"
          @click="register"
        >
          注册
        </button>
        <button :disabled="state.disablebtn" class="login visit" @click="visit">
          匿名访问
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Ref, ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { tip } from "@/utils";
import { getLogin, getRegister } from "@/api/user";
import { useUserStore } from "@/store/user";
import { baseUrl } from "@/api/axios";

const state = reactive({
  userName: "",
  password: "",
  disablebtn: false,
});

const router = useRouter();
const userStore = useUserStore();

const toLoginFlag: Ref<boolean> = computed(() => {
  return router.currentRoute.value.path === "/login";
});

const login = () => {
  const params = {
    username: state.userName,
    password: state.password,
  };
  getLogin(params).then((res: any) => {
    if (res.error) {
      tip(res.error, "error");
    } else {
      tip(res.msg);
      const obj = res.data;
      obj.avatarImg = baseUrl + obj.avatarImg;
      userStore.doLogin({
        token: res.data.token,
        id: res.data.id,
        phone: res.data.phone,
        loginName: res.data.username,
        avatarImg: res.data.avatarImg,
      });
      router.push({ path: "/" });
    }
    state.disablebtn = false;
  });
};
const register = () => {
  const params = {
    username: state.userName,
    password: state.password,
  };
  getRegister(params)
    .then((res: any) => {
      if (res.status) {
        tip(res.data);
        router.push("/login");
      } else {
        tip(res.error, "error");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const visit = () => {
  router.push("/");
};
</script>
<style lang="less" scoped>
.login_box {
  width: 320px;
  margin: 50px auto;
}
.login_box .myinput {
  width: 100%;
  border: 1px solid #cad3de;
  height: 40px;
  line-height: 40px;
  margin: 5px 0 10px;
  border-radius: 3px;
  padding: 0 10px;
  outline: none;
  box-sizing: border-box;
}
.login_box .myinput:focus {
  border: 1px solid #4289dc;
}
.login {
  box-sizing: border-box;
  border: none 0;
  height: 44px;
  line-height: 44px;
  width: 100%;
  background: #4187db;
  font-size: 16px;
  border-radius: 3px;
  margin-right: 40px;
  transition: all 0.5s ease;
  cursor: pointer;
  outline: none;
  color: #fff;
  margin-top: 15px;
}
.register {
  background: #33bb33;
}
.visit {
  background: #a0ee2d;
}
.login:hover {
  background: #2668b5;
}
.register:hover {
  background: #339933;
}
.login[disabled] {
  opacity: 0.8;
}
.login[disabled]:hover {
  background: #4187db;
}
.title {
  color: #273444;
  font-size: 1.5em;
  text-align: center;
  margin: 0 0 20px 0;
}

@media only screen and (max-width: 768px) {
  .login_box {
    width: 280px;
    margin: 50px auto;
  }
}
</style>
