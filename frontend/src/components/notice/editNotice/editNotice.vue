<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>通知管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">发布公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="100px"
        class="form-width"
        v-loading="dataloading"
      >
        <el-form-item
          prop="timingRelease"
          label="定时发布"
          class="input-width label-align"
        >
          <el-input
            v-model="editForm.timingRelease"
            auto-complete="off"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="紧急程度"
          prop="emergencyDegree"
          class="input-width label-align"
        >
          <el-select v-model="editForm.emergencyDegree" placeholder="请选择">
            <el-option
              v-for="item in emergencyDegrees"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type" class="input-width label-align">
          <el-input v-model="editForm.type" auto-complete="off"> </el-input>
        </el-form-item>
        <el-form-item
          label="日期"
          prop="releaseTime"
          class="input-width label-align"
        >
          <el-date-picker type="date" v-model="editForm.releaseTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="发布人"
          prop="releasePerson"
          class="input-width label-align"
        >
          <el-input v-model="editForm.releasePerson" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item prop="title" label="标题" class="label-align">
          <el-input v-model="editForm.title" auto-complete="off"> </el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容" class="label-align">
          <el-input
            v-model="editForm.content"
            auto-complete="off"
            type="textarea"
            :rows="10"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="file">
          <input
            type="file"
            id="file"
            style="display: none"
            ref="file_live_1"
            v-on:change="handleFileUpload()"
          />
          <el-button size="small" plain @click="chooseFile()" type="primary"
            >添加附件</el-button
          >
          <span class="item-value margin-left-10" v-if="!file_live_1">
            请选择需要上传的文件...
          </span>
          <span class="item-value margin-left-10" v-if="file_live_1"> <el-link @click="downloadFile()">
              {{ fileName }}
            </el-link> </span>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="success"
            plain
            @click="onSubmit('editForm')"
          >
            保存
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-on:click="$router.go(-1)"
          >
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
import Auth from "@/services/authentication/auth.js";
export default {
  data() {
    return {
      editForm: {
        timingRelease: "",
        emergencyDegree: 2,
        type: "",
        releaseTime: "",
        releasePerson: "",
        title: "",
        content: ""
      },
      emergencyDegrees: [
        { id: "0", name: "高" },
        { id: "1", name: "中" },
        { id: "2", name: "低" }
      ],
      rules: {
        content: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        releaseTime: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        emergencyDegree: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        releasePerson: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      images: [],
      fileName: "",
      file_live_1: null,
      id: 0,
      dataloading: true
    };
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
      this.dataloading = true;
      Request()
        .get("/api/notice/get/" + id)
        .then(response => {
          this.editForm = response;
          if (response.noticeProfiles) {
            this.file_live_1 = response.noticeProfiles;
            this.fileName = this.file_live_1.replace("/uploads/", "");
          }
          setTimeout(() => {
            this.dataloading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.file_live_1,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            this.file_live_1.replace("/uploads/", "")
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.file_live_1.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dataloading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .put("/api/notice/update/" + this.id, formData)
            .then(response => {
              this.$router.push({ path: "/notice" });
              setTimeout(() => {
                this.dataloading = false;
              }, 0.01 * 1000);
            })
            .catch(error => {});
        }
      });
    },
    chooseFile() {
      document.getElementById("file").click();
    },
    handleFileUpload() {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.fileName = this.file_live_1.name;
    },
    makeFormData() {
      var mainFormData = new FormData();
      mainFormData.append("timingRelease", ""); // this.editForm.timingRelease);
      mainFormData.append("emergencyDegree", this.editForm.emergencyDegree);
      mainFormData.append("type", this.editForm.type);
      mainFormData.append("releaseTime", new Date(this.editForm.releaseTime));
      mainFormData.append("releasePerson", this.editForm.releasePerson);
      mainFormData.append("title", this.editForm.title);
      mainFormData.append("content", this.editForm.content);
      mainFormData.append("noticeProfiles", this.file_live_1);
      mainFormData.append("id", this.id);
      mainFormData.append("updateUserId", Auth().user().id);
      mainFormData.append("file", this.file_live_1);
      return mainFormData;
    }
  }
};
</script>

<style lang="scss"></style>
