<template>
  <a-config-provider :locale="antdLocale">
    <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
export default {
  name: 'app',
  data() {
    return {
      antdLocale: undefined
    };
  },
  watch: {
    '$i18n.locale': {
      handler(newVal) {
        const langMap = new Map([
          ['zh', zhCN],
          ['en', enUS]
        ]);
        this.antdLocale = langMap.get(newVal);
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
#app {
  min-width: 1366px;
  overflow: auto;
}
</style>
