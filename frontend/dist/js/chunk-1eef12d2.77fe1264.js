(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eef12d2","chunk-2d0e2754"],{"5c5e":function(e,a,t){},"7f7f":function(e,a,t){var l=t("86cc").f,i=Function.prototype,s=/^\s*function ([^ (]*)/,c="name";c in i||t("9e1e")&&l(i,c,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},b0dc0:function(e,a,t){"use strict";var l=t("5c5e"),i=t.n(l);i.a},bd5f:function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("div",{staticClass:"title"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",[e._v("例行抽样")]),t("el-breadcrumb-item",{staticClass:"actived"},[e._v("添加结果")])],1)],1),t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.creatingSample,expression:"creatingSample"}],staticClass:"box"},[e.data?t("el-form",{ref:"data",attrs:{rules:e.dataRulse,model:e.data,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"检测名称:",prop:"sampleName"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:""},model:{value:e.data.sampleName,callback:function(a){e.$set(e.data,"sampleName",a)},expression:"data.sampleName"}})],1),t("el-form-item",{attrs:{label:"检测时间:",prop:"sampleTime"}},[t("el-date-picker",{staticStyle:{width:"300px !important"},attrs:{placeholder:""},model:{value:e.data.sampleTime,callback:function(a){e.$set(e.data,"sampleTime",a)},expression:"data.sampleTime"}})],1),t("el-form-item",{attrs:{label:"检测人员:",prop:"checkPerson"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:""},model:{value:e.data.checkPerson,callback:function(a){e.$set(e.data,"checkPerson",a)},expression:"data.checkPerson"}})],1),t("el-form-item",{attrs:{label:"检测结果:",prop:"checkResult"}},[t("el-select",{staticStyle:{width:"300px !important"},attrs:{placeholder:""},model:{value:e.data.checkResult,callback:function(a){e.$set(e.data,"checkResult",a)},expression:"data.checkResult"}},e._l([{value:0,label:"不合格"},{value:1,label:"合格"}],(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"检测单位:",prop:"checkUnit"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:""},model:{value:e.data.checkUnit,callback:function(a){e.$set(e.data,"checkUnit",a)},expression:"data.checkUnit"}})],1),t("el-form-item",{attrs:{prop:"checkFiles",label:""}},[t("div",{staticStyle:{display:"flex"}},[t("div",{staticClass:"item-label"},[t("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(a){return e.handleFileUpload()}}}),t("el-button",{attrs:{size:"small",plain:""},on:{click:function(a){return e.chooseFile()}}},[e._v("添加附件")])],1),t("span",{staticClass:"item-value",staticStyle:{width:"500px"}},[e._v(e._s(e.data.checkFiles))])])]),t("el-form-item",{attrs:{label:""}},[t("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(a){return e.onSubmit()}}},[e._v("保存")]),t("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(a){return e.$router.push({path:"/sampleCheckMain",query:{mode:1}})}}},[e._v("取消")])],1)],1):e._e(),e.data?e._e():[e._v("No matching data!")]],2)])},i=[],s=(t("7f7f"),t("55a1")),c=t("0010"),n={name:"addSampleCheckResult",data:function(){return{id:-1,creatingSample:!1,file:null,data:{checkFiles:"",checkPerson:"",checkResult:"",checkUnit:"",createUserId:0,id:0,sampleId:0,sampleName:"",sampleTime:"",updateUserId:0},dataRulse:{sampleName:[{required:!0,message:"请输入",trigger:"blur,change"}],sampleTime:[{required:!0,message:"请选择",trigger:"blur,change"}],checkPerson:[{required:!0,message:"请输入",trigger:"blur,change"}],checkFiles:[{required:!0,message:"请输入",trigger:"blur,change"}],checkResult:[{required:!0,message:"请选择",trigger:"blur,change"}],checkUnit:[{required:!0,message:"请输入",trigger:"blur,change"}]}}},methods:{chooseFile:function(){this.$refs.file.click()},handleFileUpload:function(){this.file=this.$refs.file.files[0],this.data.checkFiles=this.file.name},onSubmit:function(){var e=this,a=new FormData;a.append("checkFiles",this.data.checkFiles),a.append("checkPerson",this.data.checkPerson),a.append("createUserId",Object(c["a"])().user().id),a.append("id",this.data.id),a.append("sampleId",this.data.sampleId),a.append("sampleName",this.data.sampleName),a.append("updateUserId",Object(c["a"])().user().id),a.append("file",this.file),a.append("sampleTime",this.data.sampleTime),a.append("checkResult",this.data.checkResult),a.append("checkUnit",this.data.checkUnit),a.append("createTime",this.data.sampleTime),a.append("updateTime",this.data.sampleTime),this.$refs.data.validate((function(t){t&&(e.creatingSample=!0,Object(s["a"])().post("/api/sample_check_result/create",a).then((function(a){e.creatingSample=!1,e.$router.push("/sampleCheckMain/1")})).catch((function(e){console.error(e)})))}))},getDateString:function(e){var a=new Date(e);return a.toLocaleDateString()}}},r=n,d=(t("b0dc0"),t("2877")),p=Object(d["a"])(r,l,i,!1,null,"f75906c6",null);a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-1eef12d2.77fe1264.js.map