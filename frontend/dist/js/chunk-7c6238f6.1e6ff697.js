(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c6238f6"],{"4da2":function(e,t,a){},8067:function(e,t,a){"use strict";var i=a("4da2"),n=a.n(i);n.a},da42:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("生产主体")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("仓储环境")])],1)],1),a("div",{staticClass:"box"},[a("div",{staticClass:"iptBox"},[a("div",{staticClass:"filter-item"},[e.isShowAddButton?a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.push({path:"/productionSubject/warehouseEnv/addWarehouse/"+e.id})}}},[e._v("添加")]):e._e(),a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-class-name":e.rowIndex}},[a("el-table-column",{attrs:{formatter:e.order,label:"序号",width:"70"}}),a("el-table-column",{attrs:{prop:"warehouseName",label:"仓库名称"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(a.warehouseName))]}}])}),a("el-table-column",{attrs:{prop:"warehouseAddress",label:"仓库地址"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(a.warehouseAddress))]}}])}),a("el-table-column",{attrs:{prop:"warehouseArea",label:"仓库面积"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(a.warehouseArea))]}}])}),a("el-table-column",{attrs:{prop:"warehouseScope",label:"仓库规模"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(a.warehouseScope))]}}])}),a("el-table-column",{attrs:{label:"操作","class-name":"text-center"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[e.isShowAddButton?a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.showDetailWarehouse(i)}}},[e._v("修改")]):e._e(),e.isShowAddButton?a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.handleDelete(""+i.id)}}},[e._v("删除")]):e._e(),e.isShowViewButton?a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.showViewWarehouse(i)}}},[e._v("查看")]):e._e()]}}])})],1),a("div",{staticClass:"pageBox"},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.page.pageIndex,limit:e.page.pageSize},on:{"update:page":function(t){return e.$set(e.page,"pageIndex",t)},"update:limit":function(t){return e.$set(e.page,"pageSize",t)},pagination:e.getList}})],1)],1)])},n=[],o=(a("7514"),a("8ded")),s=a.n(o),r=a("55a1"),u=a("062e"),l=(a("0010"),{name:"warehouseEnv",components:{Pagination:u["default"]},data:function(){return{id:-1,page:{pageIndex:1,pageSize:20},listLoading:!0,total:0,radio:"1",tableData:[],isShowAddButton:null,isShowViewButton:null}},created:function(){this.id=this.$route.params.id,this.isShowAddButton=!!s.a.get("authList").find((function(e){return"addWarehouse"==e.privilegeCode})),this.isShowViewButton=!!s.a.get("authList").find((function(e){return"viewWarehouse"==e.privilegeCode})),this.getList(this.id)},methods:{showDetailWarehouse:function(e){this.$router.push({path:"/productionSubject/warehouseEnv/detailsWarehouse/".concat(this.id),query:{id:e.id}})},showViewWarehouse:function(e){this.$router.push({path:"/productionSubject/warehouseEnv/viewWarehouse/".concat(this.id),query:{id:e.id}})},getList:function(e){var t=this;this.listLoading=!0,Object(r["a"])().get("/api/warehose/all",{company_id:e,pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,sortBy:"id"}).then((function(e){t.tableData=e.data,t.total=t.tableData.length,setTimeout((function(){t.listLoading=!1}),50)})).catch((function(e){console.log(e)}))},rowIndex:function(e){var t=e.row,a=e.rowIndex;t.rowIndex=a},order:function(e){return this.page.pageSize*(this.page.pageIndex-1)+e.rowIndex+1},goBack:function(){this.$router.go(-1)},handleDelete:function(e){var t=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){t.listLoading=!0,Object(r["a"])().delete("/api/warehouse/delete/"+e).then((function(e){t.getList(t.id),setTimeout((function(){t.listLoading=!1}),50)})).catch((function(e){console.log(e)}))}))}}}),c=l,d=(a("8067"),a("2877")),p=Object(d["a"])(c,i,n,!1,null,"8d619e00",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-7c6238f6.1e6ff697.js.map