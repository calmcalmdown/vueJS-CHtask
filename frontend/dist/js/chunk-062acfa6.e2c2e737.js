(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-062acfa6"],{b4e4:function(a,e,t){},f9a4:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"container"},[t("div",{staticClass:"title"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",[a._v("投入品管理")]),t("el-breadcrumb-item",{staticClass:"actived"},[a._v("添加记录")])],1)],1),t("div",{staticClass:"box"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:a.dataloading,expression:"dataloading"}],ref:"addForm",staticClass:"form-width",attrs:{model:a.addForm,rules:a.rules,"label-width":"100px"}},[t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"企业名称",prop:"companyId"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:a.addForm.companyId,callback:function(e){a.$set(a.addForm,"companyId",e)},expression:"addForm.companyId"}},a._l(a.companyProduction,(function(a){return t("el-option",{key:a.companyId,attrs:{label:a.companyName,value:a.companyId}})})),1)],1),t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"样品名称",prop:"sampleName"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:a.addForm.sampleName,callback:function(e){a.$set(a.addForm,"sampleName",e)},expression:"addForm.sampleName"}})],1),t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"采购数量",prop:"amount"}},[t("el-input",{attrs:{"auto-complete":"off",type:"number"},model:{value:a.addForm.amount,callback:function(e){a.$set(a.addForm,"amount",e)},expression:"addForm.amount"}})],1),t("el-form-item",{attrs:{label:"",prop:"file_live_1"}},[t("input",{ref:"file_live_1",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(e){return a.handleFileUpload()}}}),t("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(e){return a.chooseFile()}}},[a._v("添加附件")]),a.file_live_1?t("span",[a._v("("+a._s(a.fileName)+")")]):t("span",[a._v("请选择需要上传的文件...")])],1),t("el-form-item",{staticClass:"left-margin"},[t("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(e){return a.onSubmit("addForm")}}},[a._v("\n              保存\n          ")]),t("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(e){return a.$router.go(-1)}}},[a._v("\n              取消\n          ")])],1)],1)],1)])},i=[],o=(t("7f7f"),t("55a1")),l=(t("d1a0"),{data:function(){return{addForm:{companyId:"",amount:"",sampleName:""},companyProduction:[],rules:{amount:[{required:!0,message:"请插入",trigger:"change"}],sampleName:[{required:!0,message:"请插入",trigger:"change"}],companyId:[{required:!0,message:"请选择",trigger:"change"}]},fileName:"",file_live_1:null,dataloading:!1}},mounted:function(){this.getCompanyProduct()},methods:{getCompanyProduct:function(){var a=this;this.dataloading=!0,Object(o["a"])().get("/api/company_production/name").then((function(e){a.companyProduction=a.companyProduction.concat(e),setTimeout((function(){a.dataloading=!1}),500)})).catch((function(a){console.log(a)}))},onSubmit:function(a){var e=this;this.$refs[a].validate((function(a){if(a){e.dataloading=!0;var t=new FormData;t=e.makeFormData(),Object(o["a"])().post("/api/inputsPurchase/create",t).then((function(a){e.$router.go(-1),setTimeout((function(){e.dataloading=!1}),10)})).catch((function(a){}))}}))},chooseFile:function(){document.getElementById("file").click()},handleFileUpload:function(){this.file_live_1=this.$refs.file_live_1.files[0],this.fileName=this.file_live_1.name},makeFormData:function(){var a=new FormData;return a.append("companyId",this.addForm.companyId),a.append("amount",this.addForm.amount),a.append("sampleName",this.addForm.sampleName),a.append("file",this.file_live_1),a.append("id",0),a}}}),r=l,s=(t("faad"),t("2877")),c=Object(s["a"])(r,n,i,!1,null,null,null);e["default"]=c.exports},faad:function(a,e,t){"use strict";var n=t("b4e4"),i=t.n(n);i.a}}]);
//# sourceMappingURL=chunk-062acfa6.e2c2e737.js.map