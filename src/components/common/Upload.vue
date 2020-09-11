<template>
  <div id="upload">
    <a-upload
      v-bind="$attrs"
      :file-list="list"
      :before-upload="beforeUploadFun"
      @preview="preview"
      @download="download"
      @reject="reject"
      @change="handleChange"
    >
      <slot></slot>
    </a-upload>
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
  name: 'Upload',
  props: {
    beforeUpload: {
      type: Function,
      default: () => {}
    },
    format: {
      type: Array,
      default: () => []
    },
    limitSize: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: [String, Array],
      default: () => []
    }
  },
  data() {
    return {
      previewImageModal: false,
      previewImage: '',
      list: []
    };
  },
  created() {
    this.list = this.parseImage(this.fileList);
  },
  watch: {
    fileList(newVal) {
      this.list = this.parseImage(newVal);
    }
  },
  methods: {
    validatorAccept(file) {
      if (this.format.length === 0) return true;

      const acceptTypes = this.format?.[0] ?? [];
      if (acceptTypes.includes('image/*')) {
        return file.type.includes('image/');
      }

      const statusArr = [];
      for (const value of acceptTypes) {
        statusArr.push(new RegExp(`(${value})$`).test(file.name));
      }
      return statusArr.includes(true);
    },
    limitSizeFun(filesize) {
      const unit = this.limitSize?.[0]?.[0];
      const compareNum = this.limitSize?.[0]?.[1];
      let boo = true;
      const unitObj = {
        b: 1,
        k: 1024,
        m: 1024 ** 2,
        g: 1024 ** 3,
        t: 1024 ** 4
      };
      if (unit && compareNum) {
        boo = filesize / unitObj[unit] <= compareNum;
      }

      return boo;
    },
    beforeUploadFun(file) {
      if (file.name.includes(',')) {
        this.$message.error('名称包含非法字符 ,');
        return false;
      }
      if (!this.validatorAccept(file)) {
        if (this.format?.[1]) this.$message.error(this.format?.[1]);
        return false;
      }
      if (!this.limitSizeFun(file.size)) {
        if (this.limitSize?.[1]) this.$message.error(this.limitSize?.[1]);
        return false;
      }
      this.beforeUpload(file);
    },
    handleChange({ file, fileList, event }) {
      if (file.name.includes(',')) return;
      if (
        file &&
        file.status !== 'removed' &&
        (!this.validatorAccept(file) || !this.limitSizeFun(file.size))
      ) {
        return;
      }
      this.list = fileList;
      this.$emit('change', { file, fileList, event });
    },
    download(file) {
      this.$emit('download', file);
    },
    reject(fileList) {
      this.$emit('reject', fileList);
    },
    preview(file) {
      // this.previewImage = file.url;
      // this.previewImageModal = true;
      this.$emit('preview', file);
    },
    parseImage(target) {
      if (typeOf(target) === 'array') return target;
      if (typeOf(target) === 'string' && !target) return [];
      if (!/,/.test(target)) {
        return [
          {
            uid: 1,
            name: 'image.png',
            status: 'done',
            url: target
          }
        ];
      }
      const targetArr = [];
      for (const [index, value] of target.split(',').entries()) {
        targetArr.push({
          uid: index,
          name: 'image.png',
          status: 'done',
          url: value
        });
      }
      return targetArr;
    }
  }
};
</script>
