<template>
  <div id="preview">
    <div
      v-for="(item, index) in list"
      :key="index"
      :style="listStyleName"
      :class="listClassName"
    >
      <img :src="item.url ? item.url : item" alt="" />
      <div class="icon-preview-list-cover">
        <a-icon
          @click="
            (previewImage = item.url ? item.url : item),
              (previewImageModal = true)
          "
          class="eye"
          type="eye"
        />
      </div>
    </div>
    <!-- 图片预览 -->
    <a-modal
      :zIndex="9999"
      :visible="previewImageModal"
      :footer="null"
      @cancel="previewImageModal = false"
    >
      <img alt="example" style="width:100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { typeOf } from '@/utils/assits';
export default {
  name: 'Preview',
  props: {
    size: {
      type: String,
      default: 'default'
    },
    styleName: {
      type: Object,
      default: () => {}
    },
    imgList: {
      type: [Array, String],
      default: () => []
    }
  },
  data() {
    return {
      list: [],
      previewImageModal: false,
      previewImage: ''
    };
  },
  created() {
    this.list = this.parseImage(this.imgList);
  },
  computed: {
    listClassName() {
      return ['icon-preview-list', `icon-preview-list-${this.size}`];
    },
    listStyleName() {
      return { ...this.styleName };
    }
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
    display: inline-block;
    position: relative;
    border: 1px solid #d9d9d9;
    padding: 8px;
    border-radius: 4px;
    margin: 10px 10px 0 0;
    &-small {
      width: 70px;
      height: 70px;
    }
    &-default {
      width: 106px;
      height: 106px;
    }
    &-larger {
      width: 142px;
      height: 142px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .icon-preview-list-cover {
      text-align: center;
      display: none;
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.4);
    }
    &:hover .icon-preview-list-cover {
      display: block;
    }
    .eye {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
