<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <div>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      zhCN
    };
  }
};
</script>
<style lang="scss">
#app {
  min-width: 1366px;
  overflow: auto;
}
</style>
