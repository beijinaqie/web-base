<template>
  <a-spin :spinning="spinning">
    <div class="containters">
      <div class="concter">
        <h2 class="enter_text">用户登陆</h2>
        <div class="input_div">
          <a-form-model
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            :model="inforDate"
            :rules="rulesFrom"
            hideRequiredMark
            style="margin-left:50px"
          >
            <div style="padding-bottom: 10px;">
              <a-form-model-item
                label="手机号"
                prop="username"
                ref="username"
              >
                <a-input
                  size="large"
                  v-model="inforDate.username"
                  placeholder="手机号"
                />
              </a-form-model-item>
            </div>
            <div style="padding-bottom: 10px;">
              <a-form-model-item
                label="密码"
                prop="password"
                ref="password"
              >
                <a-input-password
                  size="large"
                  v-model="inforDate.password"
                  type="password"
                  placeholder="密码"
                />
              </a-form-model-item>
            </div>
          </a-form-model>
          <div style="margin-top: 40px;">
            <a-button
              size="large"
              html-type="submit"
              style="width: 100px; margin-right: 80px;"
              @click="toRegister"
              >注册</a-button
            >
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              style="width: 100px; margin-left: 7px;"
              @click="userlogin('rulesFrom')"
              >登陆</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script>
import { login, getUserInfo } from 'apis/common';
import { mapMutations } from 'vuex';
export default {
  data() {
    const validatorPassword = (rules, value, cb) => {
      if (!value) {
        cb(new Error('密码不能为空'));
      } else {
        cb();
      }
    };
    return {
      spinning: false,
      inforDate: {
        // 用户名
        username: '',
        // 用户密码
        password: ''
      },
      register: 'http://192.168.1.27:9004/#/register',
      rulesFrom: {
        username: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            min: 3,
            max: 11,
            message: '手机号20个字符以内',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatorPassword,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations('common', ['set_token', 'set_user_info']),
    toRegister() {
      window.location.href = `${this.register}?redirect_uri=${window.location.origin}${this.$route.fullPath}`;
    },
    async userlogin() {
      this.spinning = true;
      const userData = {
        username: this.inforDate.username,
        userPassword: this.inforDate.password
      };
      const { success, msg, data } = await login(userData);
      this.spinning = false;
      if (!success) {
        if (msg === '已登录，无需重新登录') {
          this.$router.replace(this.$route.query.redirect);
        }
        return this.$message.error(msg);
      }
      const token = data;
      this.set_token(token);
      // 跳转到原页面
      const res = await getUserInfo(token);
      const userInfo = res.data;
      this.set_user_info(userInfo);
      this.$message.success('登陆成功!');
      if (!this.$route.query.redirect) {
        this.$router.go(-1);
      }
      this.$router.replace('/');
    }
  }
};
</script>
<style scoped>
html {
  overflow-x: hidden;
  overflow-y: hidden;
}
.containters {
  width: 100%;
  min-height: 1000px;
  background-image: url('../../assets/u2352.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  background-attachment: fixed;
}
.concter {
  width: 600px;
  height: 70%;
  min-height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.logo_img {
  padding-top: 15px;
  margin-bottom: 18px;
}
.logo_img img {
  height: 32px;
}
.enter_text {
  height: 120px;
  line-height: 120px;
  font-weight: 400;
  font-style: normal;
  color: rgba(0, 0, 0, 0.847058823529412);
}
.input_div {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.847058823529412);
}
.imput_div .inpu_span {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  margin: 0px 10px;
  color: rgba(0, 0, 0, 0.847058823529412);
}
.ant-form-item-control {
  width: 380px;
}
.ant-form-explain {
  text-align: left;
}
.ant-select-selection-selected-value {
  color: rgba(0, 0, 0, 0.247058823529412);
}
</style>
