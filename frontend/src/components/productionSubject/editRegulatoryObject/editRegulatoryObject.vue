<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改监管对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box" v-loading="processing">
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        :rules="rules"
        class="data-form"
      >
        <el-row v-if="isShowDeleteButton">
          <el-col :span="12">
            <el-form-item>
              <el-radio
                v-model="form.companyType"
                label="1"
                checked
                v-on:change="changeCompany"
                >企业</el-radio
              >
              <el-radio
                v-model="form.companyType"
                label="2"
                v-on:change="changeCompany"
                >农户</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象类型">
              <el-input
                style="width:100%"
                disabled
                :value="form.companyType == 1 ? '企业' : '农户'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乡镇">
              <el-select v-model="form.townId">
                <el-option
                  v-for="(item, index) in townList"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业">
              <el-select v-model="form.agriculturalClassification">
                <el-option
                  v-for="(item, index) in [
                    { value: '1', label: '养殖业' },
                    { value: '2', label: '畜牧业' },
                    { value: '3', label: '种植业' }
                  ]"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="form.companyType == '1'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="单位名称" prop="companyName">
                <el-input
                  v-model="form.companyName"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" prop="chargePerson">
                <el-input
                  v-model="form.chargePerson"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="companyAddress">
                <el-input
                  v-model="form.companyAddress"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="data-group-border">
            <el-row>
              <el-col :span="2">
                <el-form-item label="种植"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input
                    v-model="form.productInfo.data_0_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input-number
                    :controls="false"
                    v-model="form.productInfo.data_0_1"
                    style="width:100%"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（亩）"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="水产品"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input
                    v-model="form.productInfo.data_1_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input-number
                    v-model="form.productInfo.data_1_1"
                    :controls="false"
                    style="width:100%"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（亩）"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="畜产品"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input
                    v-model="form.productInfo.data_2_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input-number
                    :controls="false"
                    v-model="form.productInfo.data_2_1"
                    style="width:100%"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（头）"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="禽产品"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input
                    v-model="form.productInfo.data_3_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input-number
                    :controls="false"
                    v-model="form.productInfo.data_3_1"
                    style="width:100%"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（羽）"></el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="三品认证" prop="qualityStandardId">
                <el-input
                  v-model.number="form.qualityStandardId"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="contactPerson">
                <el-input
                  v-model="form.contactPerson"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人手机" prop="contactMobile">
                <el-input
                  v-model="form.contactMobile"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-show="form.companyType == '2'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="contactPerson">
                <el-input
                  v-model="form.contactPerson"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="contactWay">
                <el-input
                  v-model="form.contactWay"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="companyAddress">
                <el-input
                  v-model="form.companyAddress"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="种养殖面积" prop="plantArea">
                <el-input
                  v-model.number="form.plantArea"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="土地来源" prop="landSource">
                <el-input
                  v-model="form.landSource"
                  style="width:100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="data-group-border">
            <el-row>
              <el-col :span="3">
                <el-form-item label="种植面积（亩）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="稻麦">
                  <el-input
                    v-model="form.productInfo.data_0_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="蔬菜">
                  <el-input
                    v-model="form.productInfo.data_0_1"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="水果">
                  <el-input
                    v-model="form.productInfo.data_0_2"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="食用菌">
                  <el-input
                    v-model="form.productInfo.data_0_3"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="水产品养殖面积（亩）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="鱼">
                  <el-input
                    v-model="form.productInfo.data_1_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="虾蟹">
                  <el-input
                    v-model="form.productInfo.data_1_1"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="其他">
                  <el-input
                    v-model="form.productInfo.data_1_2"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="畜养殖规模（头）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="猪">
                  <el-input
                    v-model="form.productInfo.data_2_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="奶牛">
                  <el-input
                    v-model="form.productInfo.data_2_1"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="禽养殖规模（羽）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="肉禽">
                  <el-input
                    v-model="form.productInfo.data_3_0"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="蛋禽">
                  <el-input
                    v-model="form.productInfo.data_3_1"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="社会信用统一代码" prop="creditCode">
              <el-input v-model="form.creditCode" style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="企业荣誉">
              <el-input
                type="textarea"
                :rows="5"
                v-model="form.companyHonor"
                style="width:80%"
                class-name="el-textarea-font"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="5"
                v-model="form.remarks"
                style="width:80%"
                class-name="el-textarea-font"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="是否监管">
              <el-select v-model="form.doSupervision" placeholder>
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in [
                    { value: '1', label: '是' },
                    { value: '0', label: '否' }
                  ]"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button size="small" type="success" plain @click="onSubmit"
            >保存</el-button
          >
          <el-button
            size="small"
            type="danger"
            plain
            v-on:click="$router.go(-1)"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Storage from "store";
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth";
export default {
  name: "editRegulatoryObject",
  data() {
    let defaultRule = [
      {
        required: true,
        message: "必填",
        trigger: "blur"
      }
    ];
    return {
      townList: [{ id: -1, name: "全部" }],
      processing: false,
      form: {
        agriculturalClassification: 1,
        chargePerson: "",
        companyAddress: "",
        companyHonor: "",
        companyId: -1,
        companyName: "",
        companyType: "1",
        contactMobile: "",
        contactPerson: "",
        contactWay: "",
        createUserId: 0,
        creditCode: "",
        doSupervision: "",
        landSource: "",
        plantArea: 0,
        public_license: 0,
        public_punish: 0,
        qualityStandardId: 0,
        quality_standard: 0,
        remarks: "",
        townId: -1,
        updateUserId: 0,
        productInfo: {
          data_0_0: "",
          data_0_1: "",
          data_0_2: "",
          data_0_3: "",
          data_1_0: "",
          data_1_1: "",
          data_1_2: "",
          data_2_0: "",
          data_2_1: "",
          data_3_0: "",
          data_3_1: ""
        }
      },
      rules: {
        chargePerson: JSON.parse(JSON.stringify(defaultRule)),
        companyAddress: JSON.parse(JSON.stringify(defaultRule)),
        companyHonor: JSON.parse(JSON.stringify(defaultRule)),
        companyName: JSON.parse(JSON.stringify(defaultRule)),
        companyType: JSON.parse(JSON.stringify(defaultRule)),
        contactMobile: JSON.parse(JSON.stringify(defaultRule)),
        contactPerson: JSON.parse(JSON.stringify(defaultRule)),
        creditCode: JSON.parse(JSON.stringify(defaultRule)),
        doSupervision: JSON.parse(JSON.stringify(defaultRule)),
        landSource: JSON.parse(JSON.stringify(defaultRule)),
        plantArea: [
          {
            required: true,
            message: "请插入"
          },
          {
            type: "number",
            message: "插入号码"
          }
        ],
        qualityStandardId: [
          {
            required: true,
            message: "请插入"
          },
          {
            type: "number",
            message: "插入号码"
          }
        ],
        remarks: JSON.parse(JSON.stringify(defaultRule))
      },
      id: 0,
      isShowDeleteButton: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.isShowDeleteButton = Storage.get("authList").find(
      x => x.privilegeCode == "searchproductionSubject"
    )
      ? true
      : false;
    this.processing = true;
    this.getCompanyInfo(this.id);
    this.getTownList();
  },
  methods: {
    getCompanyInfo(id) {
      Request()
        .get("/api/company_production/get/" + id)
        .then(response => {
          this.form = response;
          if(response.productInfo){
            if(response.productInfo.indexOf("data_0_0")<0){
              var regex = new RegExp(/(?<={planting:)(.*)(?=})/g),
              results = regex.exec(response.productInfo);
              const middleStr = results ? results[1] : "[]";
              var regex1 = new RegExp(/(?<=name:")(.*)(?=, area:)/g),
              results1 = regex1.exec(middleStr);
              const data_0_0 = results1 ? results1[1] : "";
              var regex2 = new RegExp(/(?<=area:)(.*)(?="})/g),
              results2 = regex2.exec(middleStr);
              const data_0_1 = results2 ? results2[1] : "";
              this.form.productInfo = {
                data_0_0: data_0_0,
                data_0_1: data_0_1,
                data_0_2: "",
                data_0_3: "",
                data_1_0: "",
                data_1_1: "",
                data_1_2: "",
                data_2_0: "",
                data_2_1: "",
                data_3_0: "",
                data_3_1: ""
              }
            }else{
              this.form.productInfo = JSON.parse(response.productInfo);
            }
          }else{
            this.form.productInfo = {
              data_0_0: "",
              data_0_1: "",
              data_0_2: "",
              data_0_3: "",
              data_1_0: "",
              data_1_1: "",
              data_1_2: "",
              data_2_0: "",
              data_2_1: "",
              data_3_0: "",
              data_3_1: ""
            }
          }
          this.changeCompany();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTownList() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townList = response;
          this.processing = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    changeCompany() {
      if (this.form.companyType == 1) {
        this.rules.landSource[0].required = false;
        this.rules.plantArea[0].required = false;
      } else if (this.form.companyType == 2) {
        this.rules.landSource[0].required = true;
        this.rules.plantArea[0].required = true;
      }
    },
    onSubmit() {
      const user = Auth().user();
      if (!user) {
        Auth().logout();
        return;
      }

      if (this.form.companyType == "2") {
        this.form.companyName = this.form.contactPerson;
        this.form.chargePerson = this.form.contactPerson;
        this.form.contactMobile = this.form.contactWay;
      }

      this.$refs["form"].validate(valid => {
        if (valid) {
          this.processing = true;
          Request()
            .put("/api/company_production/update/" + this.id, {
              agriculturalClassification: this.form.agriculturalClassification,
              chargePerson: this.form.chargePerson,
              companyAddress: this.form.companyAddress,
              companyHonor: this.form.companyHonor,
              companyId: this.form.companyId,
              companyName: this.form.companyName,
              companyType: this.form.companyType,
              contactMobile: this.form.contactMobile,
              contactPerson: this.form.contactPerson,
              contactWay: this.form.contactWay,
              createUserId: Auth().user().id,
              creditCode: this.form.creditCode,
              doSupervision: this.form.doSupervision,
              landSource: this.form.landSource,
              plantArea: this.form.plantArea,
              productInfo: JSON.stringify(this.form.productInfo),
              public_license: this.form.public_license,
              public_punish: this.form.public_punish,
              qualityStandardId: this.form.qualityStandardId,
              quality_standard: this.form.quality_standard,
              remarks: this.form.remarks,
              townId: this.form.townId,
              updateUserId: Auth().user().id
            })
            .then(res => {
              this.processing = false;
              this.$router.push({ path: "/productionSubject" });
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./editRegulatoryObject.scss";
</style>
