(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0da3bd"],{"6b72":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("用户管理")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("添加用户")])],1)],1),this.ruleFormValue.contactName?e._e():a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticClass:"box"},[e._v("装货...")]),this.ruleFormValue.contactName?a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.pageLoading,expression:"pageLoading"}],staticClass:"box"},[a("el-form",{ref:"ruleForm",attrs:{model:e.ruleFormValue,rules:e.rules,"label-width":"150px"}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"登录名：",prop:"userId"}},[a("el-input",{attrs:{placeholder:"例: admin"},model:{value:e.ruleFormValue.userId,callback:function(t){e.$set(e.ruleFormValue,"userId",t)},expression:"ruleFormValue.userId"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"名称：",prop:"contactName"}},[a("el-input",{attrs:{placeholder:"例: 管理员"},model:{value:e.ruleFormValue.contactName,callback:function(t){e.$set(e.ruleFormValue,"contactName",t)},expression:"ruleFormValue.contactName"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"角色：",prop:"userType"}},[2===e.loggedinUserType?a("el-select",{staticClass:"w-100",attrs:{disabled:""},model:{value:e.ruleFormValue.userType,callback:function(t){e.$set(e.ruleFormValue,"userType",t)},expression:"ruleFormValue.userType"}},e._l(e.options,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1):a("el-select",{staticClass:"w-100",model:{value:e.ruleFormValue.userType,callback:function(t){e.$set(e.ruleFormValue,"userType",t)},expression:"ruleFormValue.userType"}},e._l(e.options,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),2===e.ruleFormValue.userType?a("el-form-item",{attrs:{label:"乡镇：",prop:"townId"}},[a("el-select",{staticClass:"w-100",model:{value:e.ruleFormValue.townId,callback:function(t){e.$set(e.ruleFormValue,"townId",t)},expression:"ruleFormValue.townId"}},e._l(e.township,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1):e._e(),3===e.ruleFormValue.userType?a("el-form-item",{attrs:{label:"企业：",prop:"companyId"}},[a("el-select",{staticClass:"w-100",model:{value:e.ruleFormValue.companyId,callback:function(t){e.$set(e.ruleFormValue,"companyId",t)},expression:"ruleFormValue.companyId"}},e._l(e.companyData,(function(e){return a("el-option",{key:e.companyId,attrs:{label:e.companyName,value:e.companyId}})})),1)],1):e._e()],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"联系人：",prop:"contactPerson"}},[a("el-input",{model:{value:e.ruleFormValue.contactPerson,callback:function(t){e.$set(e.ruleFormValue,"contactPerson",t)},expression:"ruleFormValue.contactPerson"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"联系方式：",prop:"contactWay"}},[a("el-input",{model:{value:e.ruleFormValue.contactWay,callback:function(t){e.$set(e.ruleFormValue,"contactWay",t)},expression:"ruleFormValue.contactWay"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"统一社会信用代码：",prop:"creditCode"}},[a("el-input",{model:{value:e.ruleFormValue.creditCode,callback:function(t){e.$set(e.ruleFormValue,"creditCode",t)},expression:"ruleFormValue.creditCode"}})],1)],1)],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmit("ruleForm")}}},[e._v("保存")]),a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:e.goBack}},[e._v("取消")])],1)],1)],1):e._e()])},r=[],l=a("55a1"),n=(a("d1a0"),a("0010")),u={name:"editUser",data:function(){return{listLoading:!0,pageLoading:!1,ruleFormValue:{creditCode:"",contactName:"",contactPerson:"",contactWay:"",userId:"",userType:null,townId:-1,companyId:-1},rules:{creditCode:[{required:!0,message:"请选择",trigger:"change"}],contactName:[{required:!0,message:"请选择",trigger:"change"}],contactPerson:[{required:!0,message:"请选择",trigger:"change"}],contactWay:[{required:!0,message:"请插入",trigger:"change"}],userType:[{required:!0,message:"请选择",trigger:"change"}],userId:[{required:!0,message:"请选择",trigger:"change"}]},options:[{id:1,name:"市级管理员"},{id:2,name:"乡镇管理员"},{id:3,name:"普通用户"}],loggedinUserType:null,township:[{id:-1,name:"全部"}],companyData:[{id:-1,name:"全部"}]}},created:function(){this.loggedinUserType=Object(n["a"])().user().userType,2===this.loggedinUserType&&(this.ruleFormValue.userType=3),this.selectedId=this.$route.params.id,this.getData(),this.getTown(),this.getCompanyProduction()},methods:{getData:function(){var e=this;Object(l["a"])().get("/api/user/get/"+this.selectedId).then((function(t){e.ruleFormValue.contactName=t.contactName,e.ruleFormValue.contactPerson=t.contactPerson,e.ruleFormValue.contactWay=t.contactWay,e.ruleFormValue.creditCode=t.creditCode,e.ruleFormValue.userType=t.userType,e.ruleFormValue.userId=t.userId,e.ruleFormValue.townId=t.townId,e.ruleFormValue.companyId=t.companyId,setTimeout((function(){e.listLoading=!1}),500)})).catch((function(e){console.log(e)}))},getTown:function(){var e=this;this.listLoading=!0,Object(l["a"])().get("/api/town/all").then((function(t){e.township=e.township.concat(t),setTimeout((function(){e.listLoading=!1}),500)})).catch((function(e){console.log(e)}))},getCompanyProduction:function(){var e=this;this.listLoading=!0,Object(l["a"])().get("/api/company_production/name").then((function(t){e.companyData=t,setTimeout((function(){e.listLoading=!1}),500)})).catch((function(e){console.log(e)}))},onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("错误 !!"),!1;t.pageLoading=!0,Object(l["a"])().put("/api/user/update/"+t.selectedId,{contactName:t.ruleFormValue.contactName,contactPerson:t.ruleFormValue.contactPerson,contactWay:t.ruleFormValue.contactWay,updateUserId:Object(n["a"])().user().id,creditCode:t.ruleFormValue.creditCode,id:t.selectedId,password:"",userId:t.ruleFormValue.userId,userType:t.ruleFormValue.userType,townId:t.ruleFormValue.townId?t.ruleFormValue.townId:-1,companyId:t.ruleFormValue.companyId?t.ruleFormValue.companyId:0}).then((function(e){setTimeout((function(){t.pageLoading=!1}),500),t.$router.push({path:"/userManagement"})})).catch((function(e){}))}))},goBack:function(){this.$router.go(-1)}}},s=u,c=a("2877"),i=Object(c["a"])(s,o,r,!1,null,"6b4b6e3c",null);t["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0da3bd.d5bf38fb.js.map