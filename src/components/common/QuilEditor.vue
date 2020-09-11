<template>
  <div id="quil-editor">
    <!-- 图片上传组件辅助-->
    <a-spin :spinning="imageLoading">
      <Upload
        :accept="accept"
        style="display: none"
        name="file"
        :action="action"
        :headers="headers"
        @change="handleChange"
      >
        <a-button ref="uploadBtn"> Upload </a-button>
      </Upload>
      <!--富文本编辑器组件-->
      <quill-editor
        :value="$attrs.value"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
    </a-spin>
  </div>
</template>

<script>
import { Quill, quillEditor } from 'vue-quill-editor';
import ImageResize from 'quill-image-resize-module';
import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme
import Upload from './Upload';
import toolbarOptions from './Config/toolbarOptions';
// 注册富文本编辑器可调整大小
Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'Quil-Editor',
  props: {
    accept: {
      // 上传类型图片类型
      type: String,
      default: 'image/*'
    },
    action: {
      // 上传地址
      type: String,
      default: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    },
    headers: {
      // 上传header
      type: Object,
      default: () => {
        return {
          Authorization: 'authorization-text'
        };
      }
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    maxLength: {
      type: Number,
      default: -1
    },
    minHeight: {
      type: String,
      default: '400px'
    }
  },
  components: {
    Upload,
    quillEditor
  },
  data() {
    return {
      imageLoading: false,
      editorSize: 0,
      editorOption: {
        placeholder: this.placeholder,
        modules: {
          imageResize: {
            // 添加
            displayStyles: {
              // 添加
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'] // 添加
          },
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: value => {
                const quill = this.$refs.myQuillEditor.quill;
                if (value) {
                  this.$refs.uploadBtn.$el.click();
                } else {
                  quill.format('image', false);
                }
              }
            }
          }
        }
      }
    };
  },
  created() {
    // 使用用户传入的配置覆盖掉默认的配置
    Object.assign(this.editorOption, this.$attrs.options);
  },
  mounted() {
    document.querySelector(
      '#quil-editor .ql-editor'
    ).style.minHeight = this.minHeight;
  },
  methods: {
    handleChange({ file }) {
      console.log('handleChange');
      this.imageLoading = true;
      const quill = this.$refs.myQuillEditor.quill;

      if (file.status === 'done' && file.response) {
        this.imageLoading = false;
        const { success, data, msg } = file.response.data;

        if (success) {
          // console.log(data);
          // 获取光标所在位置
          const length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', data.absoluteUrl);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error(msg);
        }
      } else if (file.status === 'error') {
        this.imageLoading = false;
        this.$message.error(`${file.name} 上传失败`);
      }
    },
    onEditorBlur(quill) {
      this.$emit('blur', quill);
    },
    onEditorFocus(quill) {
      this.$emit('focus', quill);
    },
    onEditorReady(quill) {
      this.$emit('ready', quill);
    },
    onEditorChange({ quill, html, text }) {
      this.editorSize = quill.getLength() - 1;
      quill.deleteText(this.maxLength >= 0 ? this.maxLength : 2 ** 64, 4);
      this.$emit('change', { quill, html, text });
      this.$emit('input', html);
    }
  }
};
</script>

<style lang="scss">
#quil-editor {
  .ql-editor {
    min-height: 400px;
  }
}
</style>

<style lang="scss" scoped></style>
