<template>
  <div id="home">
    <a-button type="primary" @click="changeLanguage('en')">切成英语</a-button>
    <a-button type="primary" @click="changeLanguage('zh')">切成汉语</a-button>
    {{ $t('message', { message: 'antd' }) }}
    <a-date-picker />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language;
    }
  }
};
</script>
