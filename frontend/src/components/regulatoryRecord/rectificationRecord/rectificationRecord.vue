<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">整改记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-row>
        <div v-if="listLoading" v-loading="listLoading">装货...</div>
      </el-row>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span>
          <i class="el-icon-warning">&nbsp;请选择图片 !!!</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false" type="primary" plain>取消</el-button>
        </span>
      </el-dialog>
      <el-form v-if="!listLoading && !isNanData" v-loading="pageLoading">
        <el-row>
          <el-col :span="5">
            <el-form-item label="乡镇">
              <el-select v-model="data.townId" placeholder="请选择">
                <el-option
                  v-for="item in township"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业">
              <el-select v-model="data.companyId">
                <el-option
                  v-for="item in companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择日期">
              <el-date-picker
                v-model="data.rectificationRecordTime"
                align="right"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查人">
              <el-input v-model="data.inspector" style="width:60%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bg-blue">检查内容与结果</div>
        <el-row>
          <el-col :span="12">
            <div class="left-margin">
              <table>
                <tbody>
                  <tr>
                    <td rowspan="2">结论</td>
                    <td>合格</td>
                    <td>
                      <el-checkbox v-model="data.conclusion" true-label="1" false-label="0"></el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>不合格</td>
                    <td>
                      <table class="no-border">
                        <tbody>
                          <tr>
                            <td>责令修改</td>
                            <td>
                              <el-input
                                v-model="conclusionData.order"
                                :disabled="data.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-input
                                v-model="conclusionData.suggestion"
                                :disabled="data.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-input
                                v-model="conclusionData.others"
                                :disabled="data.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="11">
            <table class="image-upload-table">
              <tbody>
                <tr>
                  <td>现场图片</td>
                  <td colspan="3">
                    <div class="img-container" @click="chooseFile_Live()">
                      <img :src="images" class="preview" v-if="images" />
                      <img
                        :src="downloadURL + data.scenePhotos"
                        class="preview"
                        v-if="!images && data.scenePhotos"
                      />
                    </div>
                    <el-link
                      @click="downloadFile(data.scenePhotos)"
                      style=" display: table"
                      v-if="!file_live_1 && data.scenePhotos"
                    >
                      {{
                      data.scenePhotos.replace("/uploads/", "")
                      }}
                    </el-link>
                    <p v-if="file_live_1">{{ fileName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file"
                        ref="file_live_1"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Live()"
                        name="images"
                        style="display:none"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_Sign()">
                      <img :src="signs" class="preview" v-if="signs" />
                      <img
                        :src="downloadURL + data.supervisionSign"
                        class="preview"
                        v-if="!signs && data.supervisionSign"
                      />
                    </div>
                    <el-link
                      @click="downloadFile(data.supervisionSign)"
                      style=" display: table"
                      v-if="!file_live_2 && data.supervisionSign"
                    >
                      {{
                      data.supervisionSign.replace("/uploads/", "")
                      }}
                    </el-link>
                    <p v-if="file_live_2">{{ signName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file1"
                        ref="file_live_2"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Sign()"
                        name="signs"
                        style="display:none"
                      />
                    </div>
                  </td>
                  <td>确认人签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_CofirmSign()">
                      <img :src="confirmSigns" class="preview" v-if="confirmSigns" />
                      <img
                        :src="downloadURL + data.confirmorSign"
                        class="preview"
                        v-if="!confirmSigns && data.confirmorSign"
                      />
                    </div>
                    <el-link
                      @click="downloadFile(data.confirmorSign)"
                      style=" display: table"
                      v-if="!file_live_3 && data.confirmorSign"
                    >
                      {{
                      data.confirmorSign.replace("/uploads/", "")
                      }}
                    </el-link>
                    <p v-if="file_live_3">{{ confirmSignName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file2"
                        ref="file_live_3"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_ConfirmSign()"
                        name="confirmSigns"
                        style="display:none"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>

        <el-form-item class="left-margin">
          <el-button size="small" type="success" plain v-on:click="onSubmit">保存</el-button>
          <el-button size="small" type="danger" v-on:click="$router.go(-1)" plain>取消</el-button>
        </el-form-item>
      </el-form>
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        v-if="!listLoading && isNanData"
        :rules="rules"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="乡镇" prop="townId">
              <el-select v-model="ruleFormValue.townId" placeholder="请选择">
                <el-option
                  v-for="item in township"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="companyId">
              <el-select v-model="ruleFormValue.companyId">
                <el-option
                  v-for="item in companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择日期" prop="createTime">
              <el-date-picker
                v-model="ruleFormValue.createTime"
                align="right"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查人" prop="inspector">
              <el-input v-model="ruleFormValue.inspector" style="width:60%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bg-blue">检查内容与结果</div>
        <el-row>
          <el-col :span="12">
            <div class="left-margin">
              <table>
                <tbody>
                  <tr>
                    <td rowspan="2">结论</td>
                    <td>合格</td>
                    <td>
                      <el-checkbox
                        v-model="ruleFormValue.conclusion"
                        true-label="1"
                        false-label="0"
                      ></el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>不合格</td>
                    <td>
                      <table class="no-border">
                        <tbody>
                          <tr>
                            <td>责令修改</td>
                            <td>
                              <el-input
                                v-model="ruleFormValue.order"
                                :disabled="ruleFormValue.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-input
                                v-model="ruleFormValue.suggestion"
                                :disabled="ruleFormValue.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-input
                                v-model="ruleFormValue.others"
                                :disabled="ruleFormValue.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="11">
            <table class="image-upload-table">
              <tbody>
                <tr>
                  <td>现场图片</td>
                  <td colspan="3">
                    <div class="img-container" @click="chooseFile_Live()">
                      <img :src="images" class="preview" />
                    </div>
                    <p>{{ fileName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file"
                        ref="file_live_1"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Live()"
                        name="images"
                        style="display:none"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_Sign()">
                      <img :src="signs" class="preview" />
                    </div>
                    <p>{{ signName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file1"
                        ref="file_live_2"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Sign()"
                        name="signs"
                        style="display:none"
                      />
                    </div>
                  </td>
                  <td>确认人签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_CofirmSign()">
                      <img :src="confirmSigns" class="preview" />
                    </div>
                    <p>{{ confirmSignName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file2"
                        ref="file_live_3"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_ConfirmSign()"
                        name="confirmSigns"
                        style="display:none"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
          <el-button size="small" type="success" plain v-on:click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" type="danger" v-on:click="$router.go(-1)" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Auth from "@/services/authentication/auth.js";
import axios from "axios";
export default {
  data() {
    return {
      images: "",
      fileName: "",
      signs: "",
      signName: "",
      confirmSigns: "",
      confirmSignName: "",
      superId: -1,
      listLoading: false,
      data: [],
      pageLoading: false,
      imageUrl_Live: "",
      imageUrl_Sign: "",
      imageUrl_ConfirmSign: "",
      file_live_1: null,
      file_live_2: null,
      file_live_3: null,
      township: [{ id: "-1", name: "全部" }],
      companyList: [{ companyId: "-1", companyName: "全部" }],
      conclusionData: null,
      isNanData: null,
      downloadURL: "",
      ruleFormValue: {
        townId: "-1",
        companyId: "-1",
        createTime: "",
        inspector: "",
        conclusion: "0",
        order: "",
        suggestion: "",
        others: ""
      },
      dialogVisible: false,
      rules: {
        townId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        companyId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        createTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        inspector: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.superId = this.$route.params.id;
    this.ruleFormValue.companyId = this.$route.query.company;
    this.ruleFormValue.townId = this.$route.query.township;
    this.downloadURL = Urls.DOWNLOAD_URL();
    this.getTown();
    this.getCompanyProduct();
    this.getData();
  },
  methods: {
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanyProduct() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyList = this.companyList.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData() {
      this.listLoading = true;
      Request()
        .get(
          "/api/rectification_record/all?supervisionRecordId=" + this.superId,
          {
            sortBy: "id"
          }
        )
        .then(response => {
          let tmpdata = response.data;
          this.data = tmpdata[0];
          this.isNanData = this.data ? false : true;
          if (!this.isNanData)
            this.conclusionData = JSON.parse(this.data.conclusionFalseInfo);
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      var formData = new FormData();
      formData.append("scenePhotoFile", this.file_live_1); //required
      formData.append("signFile", this.file_live_2); //required
      formData.append("confirmor", this.file_live_3); //required
      formData.append("supervisionRecordId", this.superId); //required
      var newConclusionData;
      if (this.isNanData) {
        newConclusionData =
          this.ruleFormValue.conclusion == 1
            ? {
                order: " ",
                suggestion: " ",
                others: " "
              }
            : {
                order: this.ruleFormValue.order
                  ? this.ruleFormValue.order
                  : " ",
                suggestion: this.ruleFormValue.suggestion
                  ? this.ruleFormValue.suggestion
                  : " ",
                others: this.ruleFormValue.others
                  ? this.ruleFormValue.others
                  : " "
              };
        newConclusionData = JSON.stringify(newConclusionData);
        formData.append("id", 0); //required
        formData.append("towId", this.ruleFormValue.townId);
        formData.append("conclusion", this.ruleFormValue.conclusion);
        formData.append("inspector", this.ruleFormValue.inspector);
        formData.append("companyId", this.ruleFormValue.companyId);
        formData.append("updateTime", this.ruleFormValue.createTime);
        formData.append("updateUserId", Auth().user().id);
        formData.append("createUserId", Auth().user().id);
        formData.append("createTime", this.ruleFormValue.createTime);
        formData.append(
          "rectificationRecordTime",
          this.ruleFormValue.createTime
        );
        formData.append("conclusionFalseInfo", newConclusionData);
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.listLoading = true;
            Request()
              .post("/api/rectification_record/create", formData)
              .then(response => {
                setTimeout(() => {
                  this.listLoading = false;
                }, 1000);
                this.$router.push({ path: "/regulatoryRecord" });
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      } else {
        newConclusionData = {
          order: this.conclusionData.order ? this.conclusionData.order : " ",
          suggestion: this.conclusionData.suggestion
            ? this.conclusionData.suggestion
            : " ",
          others: this.conclusionData.others ? this.conclusionData.others : " "
        };
        newConclusionData = JSON.stringify(newConclusionData);
        formData.append("townId", this.data.townId);
        formData.append("id", this.data.id); //required
        formData.append("inspector", this.data.inspector);
        formData.append("companyId", this.data.companyId);
        this.data.rectificationRecordTime = new Date(
          this.data.rectificationRecordTime
        ).toDateString("YYYY-MM-DD");
        formData.append("createTime", this.data.rectificationRecordTime);
        formData.append(
          "rectificationRecordTime",
          this.data.rectificationRecordTime
        );
        formData.append("updateUserId", Auth().user().id);
        formData.append("conclusionFalseInfo", newConclusionData);
        this.pageLoading = true;
        Request()
          .put("/api/rectification_record/update/" + this.data.id, formData)
          .then(response => {
            setTimeout(() => {
              this.pageLoading = false;
            }, 0.5 * 1000);
            this.$router.push({ path: "/regulatoryRecord" });
          })
          .catch(error => {});
      }
    },
    chooseFile_Live() {
      document.getElementById("file").click();
    },
    chooseFile_Sign() {
      document.getElementById("file1").click();
    },
    chooseFile_CofirmSign() {
      document.getElementById("file2").click();
    },
    handleFileUpload_Live() {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.images = "";
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.images = e.target.result;
      };
      if (this.file_live_1) {
        reader.readAsDataURL(this.file_live_1);
        this.fileName = this.file_live_1.name;
      } else {
        this.fileName = "";
      }
    },
    handleFileUpload_Sign() {
      this.file_live_2 = this.$refs.file_live_2.files[0];
      this.signs = "";
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.signs = e.target.result;
      };
      if (this.file_live_2) {
        reader.readAsDataURL(this.file_live_2);
        this.signName = this.file_live_2.name;
      } else {
        this.signName = "";
      }
    },
    handleFileUpload_ConfirmSign() {
      this.file_live_3 = this.$refs.file_live_3.files[0];
      this.confirmSigns = "";
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.confirmSigns = e.target.result;
      };
      if (this.file_live_3) {
        reader.readAsDataURL(this.file_live_3);
        this.confirmSignName = this.file_live_3.name;
      } else {
        this.confirmSignName = "";
      }
    },
    downloadFile(imgURL) {
      axios({
        url: Urls.DOWNLOAD_URL() + imgURL,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", imgURL.replace("/uploads/", "")); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, imgURL.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>

<style lang="scss">
@import "../addRegulatoryRecord/addRegulatoryRecord.scss";
</style>