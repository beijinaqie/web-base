<template>
  <div id="preview">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="icon-preview-list"
    >
      <img :src="item" alt="">
      <div class="icon-preview-list-cover">
        <a-icon
          @click="previewImage = item, previewImageModal = true"
          class="eye"
          type="eye" />
      </div>
    </div>
    <!-- 图片预览 -->
    <a-modal
      :zIndex="9999"
      :visible="previewImageModal"
      :footer="null"
      @cancel="previewImageModal = false"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { typeOf } from '@/utils/assits';
export default {
  name: 'preview',
  props: {
    imgList: {
      type: [Array, String],
      default: () => []
    }
  },
  data () {
    return {
      list: [],
      previewImageModal: false,
      previewImage: ''
    };
  },
  created() {
    this.list = this.parseImage(this.imgList);
  },
  methods: {
    parseImage(target) {
      if (typeOf(target) === 'array') return target;
      if (typeOf(target) === 'string' && !target) return [];
      if (!/,/.test(target)) return [target];
      return target.split(',');
    }
  }
};
</script>

<style lang="scss" scoped>
#preview {
  .icon-preview-list {
    width: 106px;
    height: 106px;
    display: inline-block;
    position: relative;
    border: 1px solid #d9d9d9;
    padding: 8px;
    border-radius: 4px;
    margin: 10px 10px 0 0;
    img {
      width: 100%;
      height: 100%;
    }
    .icon-preview-list-cover {
      width: 88px;
      height: 88px;
      text-align: center;
      display: none;
      position: absolute;
      top: 8px;
      bottom: 0;
      left: 8px;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    &:hover .icon-preview-list-cover{
      display: block;
    }
    .eye {

      line-height: 85px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
