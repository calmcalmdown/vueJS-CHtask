(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae527"],{"0a22":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[t._v("通知管理")]),a("el-breadcrumb-item",[t._v("通知公告")]),a("el-breadcrumb-item",{staticClass:"actived"},[t._v("短信记录")])],1)],1),a("div",{staticClass:"box"},[a("div",{staticClass:"iptBox"},[t._v("短信记录")]),a("div",{staticClass:"iptBox"},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),a("el-container",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.rowIndex,"highlight-current-row":""}},[a("el-table-column",{attrs:{formatter:t.order,label:"序号",width:"80"}}),a("el-table-column",{attrs:{prop:"sendTime",label:"发送时间"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n              "+t._s(t._f("formatDate")(a.sendTime))+"\n            ")]}}])}),a("el-table-column",{attrs:{prop:"noticeContents",label:"短信内容",width:"500"}}),a("el-table-column",{attrs:{prop:"sender",label:"发送人"}}),a("el-table-column",{attrs:{prop:"sendStatus",label:"发送结果"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n\t\t\t\t\t\t\t"+t._s(t.getSendStatus(a.sendStatus)))]}}])}),a("el-table-column",{attrs:{label:"发送数量",prop:"sendCount"}})],1)],1),a("div",{staticClass:"pageBox"},[a("Pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.page.pageIndex,limit:t.page.pageSize},on:{"update:page":function(e){return t.$set(t.page,"pageIndex",e)},"update:limit":function(e){return t.$set(t.page,"pageSize",e)},pagination:t.getList}})],1)],1)])},i=[],o=a("062e"),s=a("55a1"),l={name:"detailSms",components:{Pagination:o["default"]},data:function(){return{sendTime:"",noticeContents:0,sendStatus:"",sender:"",sendCount:"",page:{pageIndex:1,pageSize:20},listLoading:!0,total:0,tableData:[]}},mounted:function(){this.getList()},methods:{order:function(t){return this.page.pageSize*(this.page.pageIndex-1)+t.rowIndex+1},rowIndex:function(t){var e=t.row,a=t.rowIndex;e.rowIndex=a},getList:function(){var t=this;this.listLoading=!0,Object(s["a"])().get("/api/notice_record/all",{pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,sortBy:"id"}).then((function(e){t.tableData=e.data,t.total=e.total,setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))},getSendStatus:function(t){return 1==t?"成功":0==t?"失败":void 0}}},r=l,d=a("2877"),u=Object(d["a"])(r,n,i,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0ae527.2ee2d9dc.js.map