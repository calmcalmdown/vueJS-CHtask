<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">评级详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form v-if="data" v-loading="updateLoading">
        <div class="item-row">
          <div class="item">
            <div class="item-label">状态</div>
            <div class="item-value">{{ allStatus[data.approvalStatus] }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item inline-block-IE">
            <div class="item-label">评级时间</div>
            <div class="item-value">{{ data.gradeTime | formatDate }}</div>
          </div>
          <div class="item inline-block-IE">
            <div class="item-label">名称</div>
            <div class="item-value">{{ companyName }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">原信用评级</div>
            <div class="item-value">{{ options[grades.indexOf(data.originalGrade)] }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">现信用评级</div>
            <div class="item-value">
              <el-select v-model="data.approvalGrade" placeholder="请选择" disabled>
                <el-option
                  v-for="(item, optionIndex) in options"
                  :key="item"
                  :label="item"
                  :value="grades[optionIndex]"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">评级单位</div>
            <div class="item-value">{{ data.gradeUnit }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">
              <input
                type="file"
                id="file"
                style="display: none"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <el-button size="small" type="warning" plain @click="downloadFile()" :disabled="!data.uploadFileName">下载附件</el-button>
            </div>
            <div class="item-value" v-if="!file && data.uploadFileName">
              <el-link @click="downloadFile()">
                {{
                data.uploadFileName.replace("/uploads/", "")
                }}
              </el-link>
            </div>
            <div class="item-value" v-if="file">{{ file.name }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-value">
              <el-button size="small" type="success" plain @click="assignGrade()" :disabled="data.approvalStatus!=0">同意</el-button>
              <el-button size="small" type="danger" plain @click="rejectGrade()" :disabled="data.approvalStatus!=0">拒绝</el-button>
              <el-button size="small" type="danger" plain @click="$router.go(-1)">返回</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <el-form v-if="!data">装货...</el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";

export default {
  name: "EditRating",
  data() {
    return {
      updateLoading: false,
      id: -1,
      file: null,
      pageName: this.$route.name,
      data: null,
      grades: ["A", "B", "C"],
      options: ["A级（守信）", "B级（基本守信）", "C级（失信）"],
      allStatus: ["待审批", "已通过", "已拒绝"],
      companyName: "",
      is_ie:null
    };
  },
  created() {
    this.isIE();
    this.companyName = this.$route.query.company;
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
      Request()
        .get("/api/company_credit_grade/get/" + id)
        .then(response => {
          this.data = response;
        })
        .catch(error => {
          console.log(error);
        });
    },

    chooseFile() {
      this.$refs.file.click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    assignGrade() {
      this.updateLoading = true;
      var formData = new FormData();
      formData.append("updatedNowGrade", this.data.approvalGrade);
      formData.append("id", this.data.creditGradeId);
      formData.append("approvalGrade", this.data.approvalGrade);
      formData.append("originGrade", this.data.nowGrade);
      formData.append("approvalStatus", 1);
      if (this.file) {
        formData.append("file", this.file);
      }
      formData.append("data", this.data);
      Request()
        .put(
          "/api/company_credit_grade/update/" + this.data.creditGradeId,
          formData
        )
        .then(response => {
          this.saveChangeUpdateGrade(1, this.data.approvalGrade);
        })
        .catch(error => {});
    },

    rejectGrade() {
      this.updateLoading = true;
      var formData = new FormData();
      formData.append("updatedNowGrade", this.data.nowGrade);
      formData.append("id", this.data.creditGradeId);
      formData.append("approvalGrade", this.data.nowGrade);
      formData.append("originGrade", this.data.originGrade);
      formData.append("approvalStatus", 2);
      if (this.file) {
        formData.append("file", this.file);
      }
      formData.append("data", this.data);
      Request()
        .put(
          "/api/company_credit_grade/update/" + this.data.creditGradeId,
          formData
        )
        .then(response => {
          this.saveChangeUpdateGrade(2, this.data.nowGrade);
        })
        .catch(error => {});
    },

    saveChangeUpdateGrade(finalStatus,finalGrade) {
      let data = [];
      data.push({
        approvalStatus: 2,
        creditCode: this.data.creditCode,
        grade: this.data.nowGrade
      });
      Request()
        .put(
          "/api/company_production/updateGrade/" +
            this.data.creditCode +
            "?approvalStatus=" + finalStatus +
            "&grade" + finalGrade
        )
        .then(response => {
          this.updateLoading = false;
          this.$router.push({ path: "/creditRating" });
        })
        .catch(error => {});
    },

    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.data.uploadFileName,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.is_ie){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            this.data.uploadFileName.replace("/uploads/", "")
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.data.uploadFileName.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsRating.scss";
</style>
