(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05fb25a8"],{"09de":function(e,t,i){},"587c":function(e,t,i){"use strict";var a=i("09de"),o=i.n(a);o.a},c18b:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"title"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[e._v("作业定义")]),i("el-breadcrumb-item",{staticClass:"actived"},[e._v("修改作业")])],1)],1),i("div",{staticClass:"box"},[i("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dataloading,expression:"dataloading"}],ref:"editForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"120px"}},[i("el-form-item",{staticClass:"job-name-width",attrs:{prop:"jobName",label:"作业名称"}},[i("el-input",{staticStyle:{width:"22px"},attrs:{"auto-complete":"off"},model:{value:e.editForm.jobName,callback:function(t){e.$set(e.editForm,"jobName",t)},expression:"editForm.jobName"}})],1),i("el-form-item",{attrs:{label:"作业类型",prop:"jobType"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.editForm.jobType,callback:function(t){e.$set(e.editForm,"jobType",t)},expression:"editForm.jobType"}},e._l(e.jobTypes,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),i("el-form-item",{attrs:{label:"现场图片"}},[i("div",{staticClass:"image-container",on:{click:function(t){return e.chooseFile()}}},e._l(e.images,(function(e){return i("img",{key:e,staticClass:"preview",attrs:{src:e}})})),0),i("div",{staticClass:"image-box"},[i("input",{ref:"file",staticClass:"image-upload",staticStyle:{display:"none"},attrs:{type:"file",id:"file",accept:"image/*",name:"images"},on:{change:function(t){return e.handleFileUpload()}}})]),e.file?e._e():i("div",{staticClass:"item-value"},[i("el-link",{on:{click:function(t){return e.downloadFile()}}},[e._v("\n                  "+e._s(e.editForm.jobFile.replace("/uploads/",""))+"\n              ")])],1),e.file?i("div",{staticClass:"item-value"},[e._v("\n              "+e._s(e.file.name)+"\n          ")]):e._e()]),i("el-form-item",{staticClass:"left-margin"},[i("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmit("editForm")}}},[e._v("\n              保存\n          ")]),i("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("\n              取消\n          ")])],1)],1)],1)])},o=[],n=(i("a481"),i("55a1")),s=i("d1a0"),l=i("bc3a"),r=i.n(l),d={data:function(){return{editForm:{jobName:"",jobType:"",jobFile:""},jobTypes:[{id:0,name:"收获前"},{id:1,name:"收获"},{id:2,name:"收获后"}],rules:{jobName:[{required:!0,message:"请插入",trigger:"change"}],jobType:[{required:!0,message:"请选择",trigger:"change"}]},images:[],file:null,dataloading:!0,id:0,is_ie:null}},created:function(){this.isIE()},mounted:function(){this.editForm.jobName=this.$route.query.jobName,this.editForm.jobType=this.$route.query.jobType,this.id=this.$route.params.id,this.getData(this.$route.params.id)},methods:{getData:function(e){var t=this;this.dataloading=!0,Object(n["a"])().get("/api/job_definition/get/"+e).then((function(e){t.editForm=e,t.images=[],t.images.push(s["b"].DOWNLOAD_URL()+t.editForm.jobFile),setTimeout((function(){t.dataloading=!1}),10)})).catch((function(e){console.log(e)}))},downloadFile:function(){var e=this;r()({url:s["b"].DOWNLOAD_URL()+this.editForm.jobFile,method:"GET",responseType:"blob"}).then((function(t){if(e.is_ie){var i=new Blob([t.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(i,e.editForm.jobFile.replace("/uploads/",""))}else{var a=window.URL.createObjectURL(new Blob([t.data])),o=document.createElement("a");o.href=a,o.setAttribute("download",e.editForm.jobFile.replace("/uploads/","")),document.body.appendChild(o),o.click(),o.remove()}}))},onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(e){t.dataloading=!0;var i=new FormData;i=t.makeFormData(),Object(n["a"])().put("/api/job_definition/update/"+t.id,i).then((function(e){t.$router.push({path:"/jobDefinition"}),setTimeout((function(){t.dataloading=!1}),10)})).catch((function(e){}))}}))},chooseFile:function(){document.getElementById("file").click()},isIE:function(){var e=navigator.userAgent;this.is_ie=e.indexOf("MSIE ")>-1||e.indexOf("Trident/")>-1},handleFileUpload:function(){this.file=this.$refs.file.files[0],this.images=[];var e=new FileReader,t=this;e.onload=function(e){t.images.push(e.target.result)},e.readAsDataURL(this.file)},makeFormData:function(){var e=new FormData;return e.append("jobName",this.editForm.jobName),e.append("jobType",this.editForm.jobType),e.append("file",this.file),e.append("id",this.id),e}}},c=d,m=(i("587c"),i("2877")),u=Object(m["a"])(c,a,o,!1,null,"221786b7",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-05fb25a8.74678467.js.map