(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d230bb9"],{ee14:function(e,a,t){"use strict";t.r(a);var o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("div",{staticClass:"title"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",[e._v("培训经费管理")]),t("el-breadcrumb-item",{staticClass:"actived"},[e._v("添加经费")])],1)],1),t("div",{staticClass:"box"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dataLoading,expression:"dataLoading"}],ref:"addForm",staticClass:"form-width",attrs:{model:e.addForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{staticClass:"input-width label-align",attrs:{prop:"projectName",label:"项目名称:"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.projectName,callback:function(a){e.$set(e.addForm,"projectName",a)},expression:"addForm.projectName"}})],1),t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"申请金额:",prop:"appliedAmount"}},[t("el-input",{attrs:{"auto-complete":"off",type:"number"},model:{value:e.addForm.appliedAmount,callback:function(a){e.$set(e.addForm,"appliedAmount",a)},expression:"addForm.appliedAmount"}})],1),t("el-form-item",{staticClass:"input-width label-align",staticStyle:{"margin-right":"30px"},attrs:{label:"申请人：",prop:"proposer"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.proposer,callback:function(a){e.$set(e.addForm,"proposer",a)},expression:"addForm.proposer"}})],1),t("el-form-item",{staticClass:"input-width label-align2",attrs:{label:"所在单位：",prop:"companyId"}},[t("el-select",{model:{value:e.addForm.companyId,callback:function(a){e.$set(e.addForm,"companyId",a)},expression:"addForm.companyId"}},e._l(e.companyProduction,(function(e){return t("el-option",{key:e.companyId,attrs:{label:e.companyName,value:e.companyId}})})),1)],1),t("el-form-item",{attrs:{label:"",prop:"file_live_1"}},[t("input",{ref:"file_live_1",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(a){return e.handleFileUpload()}}}),t("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(a){return e.chooseFile()}}},[e._v("添加附件")]),e.file_live_1?t("span",[e._v("("+e._s(e.fileName)+")")]):t("span",[e._v("请选择需要上传的文件...")])],1),t("el-form-item",{staticClass:"left-margin"},[t("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(a){return e.onSubmit("addForm")}}},[e._v("\n              保存\n          ")]),t("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(a){return e.$router.go(-1)}}},[e._v("\n              取消\n          ")])],1)],1)],1)])},n=[],i=(t("7f7f"),t("55a1")),r=(t("d1a0"),{data:function(){return{addForm:{projectName:"",appliedAmount:"",proposer:"",companyId:"-1"},companyProduction:{id:-1,name:"全部"},rules:{projectName:[{required:!0,message:"请插入",trigger:"change"}],appliedAmount:[{required:!0,message:"请插入",trigger:"change"}],companyId:[{required:!0,message:"请选择",trigger:"change"}],proposer:[{required:!0,message:"请插入",trigger:"change"}]},fileName:"",file_live_1:null,dataLoading:!1}},mounted:function(){this.getCompanyProduct()},methods:{getCompanyProduct:function(){var e=this;Object(i["a"])().get("/api/company_production/name").then((function(a){e.companyProduction=e.companyProduction.concat(a)})).catch((function(e){console.log(e)}))},onSubmit:function(e){var a=this;this.$refs[e].validate((function(e){if(e){a.dataLoading=!0;var t=new FormData;t=a.makeFormData(),Object(i["a"])().post("/api/training_funds/create",t).then((function(e){a.$router.push({path:"/trainingFunds"}),setTimeout((function(){a.dataLoading=!1}),10)})).catch((function(e){}))}}))},chooseFile:function(){document.getElementById("file").click()},handleFileUpload:function(){this.file_live_1=this.$refs.file_live_1.files[0],this.fileName=this.file_live_1.name},makeFormData:function(){var e=new FormData;return e.append("projectName",this.addForm.projectName),e.append("appliedAmount",this.addForm.appliedAmount),e.append("proposer",this.addForm.proposer),e.append("companyId",this.addForm.companyId),e.append("id",0),e.append("file",this.file_live_1),e}}}),l=r,s=t("2877"),d=Object(s["a"])(l,o,n,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d230bb9.ae196e57.js.map