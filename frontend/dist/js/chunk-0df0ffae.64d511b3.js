(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0df0ffae","chunk-2d0e2754"],{"2ce2":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("通知管理")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("发布公告")])],1)],1),a("div",{staticClass:"box"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dataloading,expression:"dataloading"}],ref:"addForm",staticClass:"form-width",attrs:{model:e.addForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{staticClass:"input-width label-align",attrs:{prop:"timingRelease",label:"定时发布"}},[a("el-date-picker",{attrs:{"auto-complete":"off",type:"datetime"},model:{value:e.addForm.timingRelease,callback:function(t){e.$set(e.addForm,"timingRelease",t)},expression:"addForm.timingRelease"}})],1),a("el-form-item",{staticClass:"input-width label-align",attrs:{label:"紧急程度",prop:"emergencyDegree"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addForm.emergencyDegree,callback:function(t){e.$set(e.addForm,"emergencyDegree",t)},expression:"addForm.emergencyDegree"}},e._l(e.emergencyDegrees,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{staticClass:"input-width label-align",attrs:{label:"类型",prop:"type"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.type,callback:function(t){e.$set(e.addForm,"type",t)},expression:"addForm.type"}})],1),a("el-form-item",{staticClass:"input-width label-align",attrs:{label:"日期",prop:"releaseTime"}},[a("el-date-picker",{attrs:{type:"date"},model:{value:e.addForm.releaseTime,callback:function(t){e.$set(e.addForm,"releaseTime",t)},expression:"addForm.releaseTime"}})],1),a("el-form-item",{staticClass:"input-width label-align",attrs:{label:"发布人",prop:"releasePerson"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.releasePerson,callback:function(t){e.$set(e.addForm,"releasePerson",t)},expression:"addForm.releasePerson"}})],1),a("el-form-item",{staticClass:"label-align",attrs:{prop:"title",label:"标题"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.title,callback:function(t){e.$set(e.addForm,"title",t)},expression:"addForm.title"}})],1),a("el-form-item",{staticClass:"label-align",attrs:{prop:"content",label:"内容"}},[a("el-input",{attrs:{"auto-complete":"off",type:"textarea",rows:10},model:{value:e.addForm.content,callback:function(t){e.$set(e.addForm,"content",t)},expression:"addForm.content"}})],1),a("el-form-item",{attrs:{label:"",prop:"file"}},[a("input",{ref:"file_live_1",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(t){return e.handleFileUpload()}}}),a("el-button",{attrs:{size:"small",plain:""},on:{click:function(t){return e.chooseFile()}}},[e._v("添加附件")]),a("span",{staticClass:"margin-left-10",staticStyle:{width:"300px"}},[e._v(e._s(e.fileName))])],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmit("addForm")}}},[e._v("保存")]),a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)])},r=[],l=(a("7f7f"),a("55a1")),n=(a("d1a0"),a("0010")),s={data:function(){return{addForm:{timingRelease:"",emergencyDegree:0,type:"",releaseTime:"",releasePerson:"",title:"",content:""},emergencyDegrees:[{id:0,name:"高"},{id:1,name:"中"},{id:2,name:"低"}],rules:{content:[{required:!0,message:"请插入",trigger:"change"}],releaseTime:[{required:!0,message:"请插入",trigger:"change"}],title:[{required:!0,message:"请选择",trigger:"change"}],timingRelease:[{required:!0,message:"请插入",trigger:"change"}],emergencyDegree:[{required:!0,message:"请选择",trigger:"change"}],type:[{required:!0,message:"请选择",trigger:"change"}],releasePerson:[{required:!0,message:"请选择",trigger:"change"}]},images:[],fileName:"",file_live_1:null,dataloading:!1}},mounted:function(){},methods:{onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(e){t.dataloading=!0;var a=new FormData;a=t.makeFormData(),Object(l["a"])().post("/api/notice/create",a).then((function(e){t.$router.push({path:"/notice"}),setTimeout((function(){t.dataloading=!1}),10)})).catch((function(e){}))}}))},chooseFile:function(){document.getElementById("file").click()},handleFileUpload:function(){this.file_live_1=this.$refs.file_live_1.files[0],this.fileName=this.file_live_1.name},makeFormData:function(){var e=new FormData;return e.append("timingRelease",this.addForm.timingRelease),e.append("emergencyDegree",this.addForm.emergencyDegree),e.append("type",this.addForm.type),e.append("releaseTime",this.addForm.releaseTime),e.append("releasePerson",this.addForm.releasePerson),e.append("title",this.addForm.title),e.append("content",this.addForm.content),e.append("id",0),e.append("file",this.file_live_1),e.append("createUserId",Object(n["a"])().user().id),e.append("updateUserId",Object(n["a"])().user().id),e}}},o=s,d=a("2877"),c=Object(d["a"])(o,i,r,!1,null,null,null);t["default"]=c.exports},"7f7f":function(e,t,a){var i=a("86cc").f,r=Function.prototype,l=/^\s*function ([^ (]*)/,n="name";n in r||a("9e1e")&&i(r,n,{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-0df0ffae.64d511b3.js.map