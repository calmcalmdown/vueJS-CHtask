(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2163a5"],{c222:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("生产记录")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("修改记录")])],1)],1),e.data?a("div",{staticClass:"box"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.pageLoading,expression:"pageLoading"}],ref:"ruleForm",attrs:{model:e.ruleFormValue,rules:e.rules,"label-width":"120px"}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"产品名称",prop:"productId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleFormValue.productId,callback:function(t){e.$set(e.ruleFormValue,"productId",t)},expression:"ruleFormValue.productId"}},e._l(e.productNameList,(function(e){return a("el-option",{key:e.productId,attrs:{label:e.productName,value:e.productId}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"产量",prop:"productionQuantity"}},[a("el-input",{model:{value:e.ruleFormValue.productionQuantity,callback:function(t){e.$set(e.ruleFormValue,"productionQuantity",e._n(t))},expression:"ruleFormValue.productionQuantity"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"产地",prop:"productionArea"}},[a("el-input",{model:{value:e.ruleFormValue.productionArea,callback:function(t){e.$set(e.ruleFormValue,"productionArea",t)},expression:"ruleFormValue.productionArea"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"生产时长(天)",prop:"productionTime"}},[a("el-input",{model:{value:e.ruleFormValue.productionTime,callback:function(t){e.$set(e.ruleFormValue,"productionTime",e._n(t))},expression:"ruleFormValue.productionTime"}})],1)],1)],1),a("el-form-item",[a("el-col",{attrs:{span:18}},[a("div",{staticClass:"item",staticStyle:{display:"flex"}},[a("div",{staticClass:"item-label",staticStyle:{"margin-bottom":"20px"}},[a("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(t){return e.handleFileUpload()}}}),a("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return e.chooseFile()}}},[e._v("添加附件")])],1),a("div",{staticClass:"item-value",staticStyle:{"margin-left":"10px",display:"flex","align-items":"center","padding-bottom":"20px"}},[e.file?a("span",[e._v(e._s(e.file.name))]):e.data.productionProfiles?a("div",{staticClass:"item-value"},[a("el-link",{on:{click:function(t){return e.downloadFile()}}},[e._v("\n                  "+e._s(e.data.productionProfiles.replace("/uploads/",""))+"\n                ")])],1):e._e()])])])],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmit("ruleForm")}}},[e._v("保存")]),a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1):a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticClass:"box"},[e._v("装货...")])])},r=[],i=(a("a481"),a("7514"),a("55a1")),n=a("d1a0"),l=a("bc3a"),u=a.n(l),d={name:"editProductionRecord",data:function(){return{file:null,id:"",pageLoading:!1,listLoading:!1,data:null,productNameList:[],ruleFormValue:{productId:"",productionQuantity:"",productionArea:"",productionTime:""},rules:{productId:[{required:!0,message:"请选择",trigger:"change"}],productionQuantity:[{required:!0,message:"请插入"},{type:"number",message:"插入号码"}],productionArea:[{required:!0,message:"请插入"}],productionTime:[{required:!0,message:"请插入",trigger:"change"},{type:"number",message:"插入号码"}]}}},created:function(){this.getProductionDetail(),this.getData(this.$route.params.id)},methods:{getData:function(e){var t=this;this.listLoading=!0,Object(i["a"])().get("/api/production_record/get/"+e).then((function(e){setTimeout((function(){t.listLoading=!1}),500),t.data=e,t.ruleFormValue.productId=t.data.productId,t.ruleFormValue.productionQuantity=t.data.productionQuantity,t.ruleFormValue.productionArea=t.data.productionArea,t.ruleFormValue.productionTime=t.data.productionTime})).catch((function(e){console.log(e)}))},getProductionDetail:function(){var e=this;Object(i["a"])().get("/api/product_production/all",{sortBy:"productId"}).then((function(t){e.productNameList=t.data})).catch((function(e){console.log(e)}))},onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(e){t.pageLoading=!0;var a=new FormData;a=t.makeFormData(),Object(i["a"])().put("/api/production_record/update/"+t.data.id,a).then((function(e){setTimeout((function(){t.pageLoading=!1}),500),t.$router.push({path:"/productionRecord"})})).catch((function(e){console.log(e)}))}}))},makeFormData:function(){var e=new FormData;this.file&&e.append("file",this.file),e.append("id",this.data.id),e.append("productId",this.ruleFormValue.productId);var t=this.filterProduct(this.ruleFormValue.productId);return e.append("productName",t),e.append("productionArea",this.ruleFormValue.productionArea),e.append("productionQuantity",this.ruleFormValue.productionQuantity),e.append("productionTime",this.ruleFormValue.productionTime),e},chooseFile:function(){this.$refs.file.click()},handleFileUpload:function(){this.file=this.$refs.file.files[0]},filterProduct:function(e){var t=this.productNameList.find((function(t){return t.productId===e}));return t?t.productName:""},downloadFile:function(){var e=this;u()({url:n["b"].DOWNLOAD_URL()+this.data.productionProfiles,method:"GET",responseType:"blob"}).then((function(t){if(e.isIE()){var a=new Blob([t.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(a,e.data.productionProfiles.replace("/uploads/",""))}else{var o=window.URL.createObjectURL(new Blob([t.data])),r=document.createElement("a");r.href=o,r.setAttribute("download",e.data.productionProfiles.replace("/uploads/","")),document.body.appendChild(r),r.click(),r.remove()}}))},isIE:function(){var e=navigator.userAgent;return e.indexOf("MSIE ")>-1||e.indexOf("Trident/")>-1}}},c=d,s=a("2877"),p=Object(s["a"])(c,o,r,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d2163a5.ab283cd9.js.map