(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bdb6a"],{"2cbe":function(a,t,e){"use strict";e.r(t);var i=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[a._v("认证工作")]),e("el-breadcrumb-item",{staticClass:"actived"},[a._v("认证详情")])],1)],1),e("div",{staticClass:"box"},[e("el-form",{directives:[{name:"loading",rawName:"v-loading",value:a.listLoading,expression:"listLoading"}],attrs:{"label-width":"100px"},model:{value:a.data,callback:function(t){a.data=t},expression:"data"}},[e("el-row",[e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{label:"企业名称"}},[e("el-input",{attrs:{disabled:""},model:{value:a.companyName,callback:function(t){a.companyName=t},expression:"companyName"}})],1)],1),e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{label:"产品名称"}},[e("el-input",{attrs:{disabled:""},model:{value:a.productName,callback:function(t){a.productName=t},expression:"productName"}})],1)],1)],1),e("el-form-item",{attrs:{label:"认证类型"}},[e("el-radio-group",{attrs:{disabled:""},model:{value:a.data.certificationType,callback:function(t){a.$set(a.data,"certificationType",t)},expression:"data.certificationType"}},[e("el-radio",{attrs:{label:"1"}},[a._v("无公害产品")]),e("el-radio",{attrs:{label:"2"}},[a._v("绿色食品")]),e("el-radio",{attrs:{label:"3"}},[a._v("有机食品")]),e("el-radio",{attrs:{label:"4"}},[a._v("地理标志")])],1)],1),e("el-row",[e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{label:"认证类别"}},[e("el-input",{attrs:{disabled:""},model:{value:a.data.certificationCategory,callback:function(t){a.$set(a.data,"certificationCategory",t)},expression:"data.certificationCategory"}})],1)],1),e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{label:"农业分类"}},[e("el-select",{attrs:{placeholder:"请选择",disabled:""},model:{value:a.data.argriculturalClassification,callback:function(t){a.$set(a.data,"argriculturalClassification",t)},expression:"data.argriculturalClassification"}},a._l(a.options,(function(a){return e("el-option",{key:a.value,attrs:{label:a.label,value:a.value}})})),1)],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:7}},[e("el-form-item",{attrs:{label:"证书编号"}},[e("el-input",{attrs:{disabled:""},model:{value:a.data.certificationNo,callback:function(t){a.$set(a.data,"certificationNo",t)},expression:"data.certificationNo"}})],1)],1)],1),e("el-form-item",{staticStyle:{"text-align":"center"},attrs:{label:"认证有效期"}},[e("el-col",{attrs:{span:7}},[e("el-date-picker",{staticStyle:{width:"100% !important"},attrs:{type:"date",placeholder:"",disabled:""},model:{value:a.data.certificationStartTime,callback:function(t){a.$set(a.data,"certificationStartTime",t)},expression:"data.certificationStartTime"}})],1),e("el-col",{staticClass:"line",attrs:{span:1}},[a._v("至")]),e("el-col",{attrs:{span:7}},[e("el-date-picker",{staticStyle:{width:"100% !important"},attrs:{type:"date",placeholder:"",disabled:""},model:{value:a.data.certificationEndTime,callback:function(t){a.$set(a.data,"certificationEndTime",t)},expression:"data.certificationEndTime"}})],1)],1),e("el-row",[e("el-col",{attrs:{span:6}},[e("el-form-item",{attrs:{label:"产量"}},[e("el-input",{attrs:{disabled:""},model:{value:a.data.output,callback:function(t){a.$set(a.data,"output",t)},expression:"data.output"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:16}},[e("el-form-item",[e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[e("input",{ref:"files",staticStyle:{display:"none"},attrs:{type:"file",id:"files"},on:{change:function(t){return a.handleFileUpload()}}}),e("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return a.downloadFile()}}},[a._v("下载附件")]),a.files?e("span",{staticClass:"item-value"},[e("el-link",{staticClass:"margin-left-10",on:{click:function(t){return a.downloadFile()}}},[a._v("\n                      "+a._s(a.files.replace("/uploads/",""))+"\n                    ")])],1):a._e(),a.files?a._e():e("span",{staticClass:"item-value"},[a._v("("+a._s(a.fileName)+")")])],1)])])])],1)],1),e("el-form-item",[e("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:a.goBack}},[a._v("返回")])],1)],1)],1)])},l=[],s=(e("a481"),e("7f7f"),e("55a1")),o=e("d1a0"),n=e("bc3a"),r=e.n(n),c={name:"detailsThreeProducts",data:function(){return{id:-1,pageName:this.$route.name,data:[],files:null,fileName:"",companyName:"",productName:"",listLoading:!1,argriculturalClassification:0,options:[{value:1,label:"养殖业"},{value:2,label:"已同意"},{value:3,label:"畜牧业"},{value:4,label:"种植业"}]}},created:function(){this.companyName=this.$route.query.company,this.productName=this.$route.query.product,this.id=this.$route.params.id,this.getData(this.$route.params.id)},methods:{getData:function(a){var t=this;this.listLoading=!0,Object(s["a"])().get("/api/quality_standard/get/"+a).then((function(a){t.data=a,t.data.argriculturalClassification=parseInt(a.argriculturalClassification),t.files=a.files,a.files||(t.fileName=""),setTimeout((function(){t.listLoading=!1}),10)})).catch((function(a){console.log(a)}))},goBack:function(){this.$router.go(-1)},chooseFile:function(){this.$refs.files.click()},handleFileUpload:function(){this.files=this.$refs.files.files[0]},downloadFile:function(){var a=this;r()({url:o["b"].DOWNLOAD_URL()+this.files,method:"GET",responseType:"blob"}).then((function(t){if(a.isIE()){var e=new Blob([t.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(e,a.files.replace("/uploads/",""))}else{var i=window.URL.createObjectURL(new Blob([t.data])),l=document.createElement("a");l.href=i,l.setAttribute("download",a.files.replace("/uploads/","")),document.body.appendChild(l),l.click(),l.remove()}}))},isIE:function(){var a=navigator.userAgent;return a.indexOf("MSIE ")>-1||a.indexOf("Trident/")>-1}}},d=c,u=e("2877"),p=Object(u["a"])(d,i,l,!1,null,"13d03dbf",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0bdb6a.5b10dd23.js.map