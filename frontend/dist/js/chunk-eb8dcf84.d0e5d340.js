(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eb8dcf84","chunk-2d0e2754"],{"0a49":function(t,e,a){var i=a("9b43"),n=a("626a"),l=a("4bf8"),r=a("9def"),o=a("cd1c");t.exports=function(t,e){var a=1==t,s=2==t,c=3==t,u=4==t,d=6==t,p=5==t||d,f=e||o;return function(e,o,h){for(var b,g,v=l(e),y=n(v),m=i(o,h,3),w=r(y.length),S=0,_=a?f(e,w):s?f(e,0):void 0;w>S;S++)if((p||S in y)&&(b=y[S],g=m(b,S,v),t))if(a)_[S]=g;else if(g)switch(t){case 3:return!0;case 5:return b;case 6:return S;case 2:_.push(b)}else if(u)return!1;return d?-1:c||u?u:_}}},1169:function(t,e,a){var i=a("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},"20d6":function(t,e,a){"use strict";var i=a("5ca1"),n=a("0a49")(6),l="findIndex",r=!0;l in[]&&Array(1)[l]((function(){r=!1})),i(i.P+i.F*r,"Array",{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(l)},"34bb":function(t,e,a){t.exports=a.p+"img/button1.d91caaaf.png"},"3ef0":function(t,e,a){t.exports=a.p+"img/button2.7d20db87.png"},"56b0":function(t,e,a){"use strict";var i=a("9650"),n=a.n(i);n.a},7514:function(t,e,a){"use strict";var i=a("5ca1"),n=a("0a49")(5),l="find",r=!0;l in[]&&Array(1)[l]((function(){r=!1})),i(i.P+i.F*r,"Array",{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(l)},"7f7f":function(t,e,a){var i=a("86cc").f,n=Function.prototype,l=/^\s*function ([^ (]*)/,r="name";r in n||a("9e1e")&&i(n,r,{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(t){return""}}})},8507:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",attrs:{id:"production-subject"}},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{staticClass:"actived"},[t._v("监管对象")])],1)],1),a("div",{staticClass:"box"},[t.isShowSearchOption?a("div",{staticClass:"iptBox"},[a("div",{staticClass:"filter-item margin-bottom-20"},[a("div",{staticClass:"select_label no-margin-left"},[t._v("乡镇")]),a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},on:{change:t.getList},model:{value:t.townId,callback:function(e){t.townId=e},expression:"townId"}},[a("el-option",{attrs:{label:"全部",value:-1}}),t._l(t.townList,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2)],1),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"select_label"},[t._v("类型")]),[a("el-radio",{attrs:{label:"1"},on:{change:t.getList},model:{value:t.companyType,callback:function(e){t.companyType=e},expression:"companyType"}},[t._v("企业")]),a("el-radio",{attrs:{label:"2"},on:{change:t.getList},model:{value:t.companyType,callback:function(e){t.companyType=e},expression:"companyType"}},[t._v("农户")])]],2),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"select_label"},[t._v("行业")]),a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},on:{change:t.getList},model:{value:t.agriculturalClassification,callback:function(e){t.agriculturalClassification=e},expression:"agriculturalClassification"}},t._l([{value:0,label:"全部"},{value:1,label:"养殖业"},{value:2,label:"畜牧业"},{value:3,label:"种植业"}],(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"select_label"},[t._v("三品认证")]),a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},on:{change:t.filterList},model:{value:t.quality_standard,callback:function(e){t.quality_standard=e},expression:"quality_standard"}},t._l([{value:-1,label:"全部"},{value:1,label:"有"},{value:0,label:"无"}],(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"select_label"},[t._v("监管记录")]),a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},on:{change:t.filterList},model:{value:t.supervision_record,callback:function(e){t.supervision_record=e},expression:"supervision_record"}},t._l([{value:-1,label:"全部"},{value:1,label:"有"},{value:0,label:"无"}],(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"select_label"},[t._v("农业监测")]),a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},on:{change:t.filterList},model:{value:t.disability_check,callback:function(e){t.disability_check=e},expression:"disability_check"}},t._l([{value:-1,label:"全部"},{value:1,label:"有"},{value:0,label:"无"}],(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),t.isShowAddButton?a("div",{staticClass:"filter-item"},[a("el-button",{staticClass:"margin-left-20",attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.gotoAddRegulatoryObject()}}},[t._v("添加监管对象")])],1):t._e(),a("div",{staticClass:"allCompany"},[t._v("\n        共计\n        "),a("b",{staticClass:"blue-colored"},[t._v(t._s(t.total))]),t._v(" 家企业\n      ")])]):t._e(),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.rowIndex}},[a("el-table-column",{attrs:{formatter:t.order,label:"序号",width:"70"}}),a("el-table-column",{attrs:{prop:"companyName",label:"企业名称",width:"150"}}),a("el-table-column",{attrs:{prop:"chargePerson",label:"法人代表",width:"150"}}),a("el-table-column",{attrs:{prop:"companyAddress",label:"企业地址"}}),t.isShowSearchOption?a("el-table-column",{attrs:{prop:"qualityStandardId",label:"三品认证","class-name":"text-center normal-line-height",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[0!==i.qualityStandard&&null!=i.qualityStandard?a("el-image",{staticClass:"button-img small-size",attrs:{src:t.Button2},on:{click:function(e){return t.$router.push({path:"/productionSubject/threeProduct",query:{creditCode:i.creditCode}})}}}):t._e(),0!==i.qualityStandard&&null!=i.qualityStandard?a("p",{staticClass:"padding-left-10 button-p",on:{click:function(e){return t.$router.push({path:"/productionSubject/threeProduct",query:{creditCode:i.creditCode}})}}},[t._v("\n            认证信息\n          ")]):t._e(),0===i.qualityStandard||null==i.qualityStandard?a("p",{staticClass:"padding-left-10"},[t._v("\n            无\n          ")]):t._e()]}}],null,!1,3580213708)}):t._e(),t.isShowSearchOption?a("el-table-column",{attrs:{prop:"doSupervision",label:"监管记录","class-name":"text-center normal-line-height",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[0!==i.supervisionRecord&&null!=i.supervisionRecord?a("el-image",{staticClass:"button-img",attrs:{src:t.Button1},on:{click:function(e){return t.$router.push({path:"/regulatoryRecord/",query:{companyId:i.companyId}})}}}):t._e(),0===i.supervisionRecord||null==i.supervisionRecord?a("p",{staticClass:"padding-left-10"},[t._v("\n            无\n          ")]):t._e()]}}],null,!1,108979913)}):t._e(),t.isShowSearchOption?a("el-table-column",{attrs:{prop:"address",label:"农药检测",size:"mini","class-name":"text-center normal-line-height",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[0!==i.disabilityCheck&&null!=i.disabilityCheck?a("el-image",{staticClass:"button-img",attrs:{src:t.Button1},on:{click:function(e){return t.$router.push({path:"/disabilityCheck/",query:{creditCode:i.creditCode}})}}}):t._e(),0===i.disabilityCheck||null==i.disabilityCheck?a("p",{staticClass:"padding-left-10"},[t._v("\n            无\n          ")]):t._e()]}}],null,!1,1943223782)}):t._e(),a("el-table-column",{attrs:{prop:"contactPerson",label:"联系人",width:"90"}}),a("el-table-column",{attrs:{prop:"contactMobile",label:"联系方式",width:"120"}}),a("el-table-column",{attrs:{prop:"address",label:"所在乡镇",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n          "+t._s(t.getTownship(a.townId))+"\n        ")]}}])}),a("el-table-column",{attrs:{prop:"nowGrade",label:"企业诚信",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("span",{staticClass:"rating-action",on:{click:function(e){return t.gotoCreditRatingPage(i)}}},[a("el-rate",{attrs:{value:i.nowGrade,max:i.nowGrade,texts:["C:失信","B:基本守信","A:守信"],colors:t.colors,disabled:"","show-text":""}})],1)]}}])}),a("el-table-column",{attrs:{prop:"operations",label:"操作",width:"300","class-name":"text-center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[t.isShowEditButton?a("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(e){return t.gotoEditProductPage(i)}}},[t._v("修改")]):t._e(),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.gotoProductPage(i)}}},[t._v("产品")]),a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){return t.gotoWarehousingEnvironmentPage(i)}}},[t._v("仓储环境")]),t.isShowDetail?a("el-button",{attrs:{size:"small",type:"info"},on:{click:function(e){return t.gotoDetailsProductPage(i)}}},[t._v("详情")]):t._e()]}}])})],1),a("div",{staticClass:"pageBox"},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.page.pageIndex,limit:t.page.pageSize},on:{"update:page":function(e){return t.$set(t.page,"pageIndex",e)},"update:limit":function(e){return t.$set(t.page,"pageSize",e)},pagination:t.getList}})],1)],1)])},n=[],l=(a("ac6a"),a("96cf"),a("3b8d")),r=(a("7f7f"),a("20d6"),a("7514"),a("8ded")),o=a.n(r),s=a("55a1"),c=(a("0010"),a("34bb")),u=a.n(c),d=a("3ef0"),p=a.n(d),f=function(){return a.e("chunk-6051483f").then(a.bind(null,"062e"))},h={name:"productionSubject",components:{Pagination:f},data:function(){return{Button1:u.a,Button2:p.a,townId:-1,companyType:0,agriculturalClassification:0,quality_standard:"全部",supervision_record:"全部",disability_check:"全部",page:{pageIndex:1,pageSize:20},total:0,radio:"1",listLoading:!0,townList:[{id:-1,name:"全部"}],tableData:[],srcData:[],colors:{1:"#f00",2:"#F7BA2A",3:"#0f0"},value2:2,isShowAddButton:null,isShowEditButton:null,isShowDetail:null,isShowSearchOption:null}},created:function(){this.getList(),this.getTownList(),this.isShowAddButton=!!o.a.get("authList").find((function(t){return"addRegulatoryObject"==t.privilegeCode})),this.isShowEditButton=!!o.a.get("authList").find((function(t){return"editRegulatoryObject"==t.privilegeCode})),this.isShowDetail=!!o.a.get("authList").find((function(t){return"detailsRegulatoryObject"==t.privilegeCode})),this.isShowSearchOption=!!o.a.get("authList").find((function(t){return"searchRegulatoryObject"==t.privilegeCode}))},methods:{getTownship:function(t){var e=this.townList.findIndex((function(e){return e.id==t}));return e<0?"":this.townList[e].name},gotoCreditRatingPage:function(t){this.$router.push({path:"/corporateCreditFile/ratingInfo",query:{creditCode:t.creditCode}})},gotoAddRegulatoryObject:function(){this.$router.push("/productionSubject/addRegulatoryObject")},gotoEditProductPage:function(t){this.$router.push("/productionSubject/editRegulatoryObject/".concat(t.companyId))},gotoDetailsProductPage:function(t){this.$router.push("/productionSubject/detailsRegulatoryObject/".concat(t.companyId))},gotoProductPage:function(t){this.$router.push("/productionSubject/mainProduct/".concat(t.companyId))},gotoWarehousingEnvironmentPage:function(t){this.$router.push("/productionSubject/warehouseEnv/".concat(t.companyId))},getTownList:function(){var t=this;Object(s["a"])().get("/api/town/all",{}).then((function(e){t.townList=e})).catch((function(t){console.error(t)}))},getNowGrade:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e,a){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i="",i=a&&a.length?a.pop().nowGrade:"",t.abrupt("return",i);case 3:case"end":return t.stop()}}),t)})));function e(e,a){return t.apply(this,arguments)}return e}(),filterList:function(){this.tableData=this.srcData,1===this.quality_standard?this.tableData=this.tableData.filter((function(t){return t.qualityStandard>0})):0===this.quality_standard&&(this.tableData=this.tableData.filter((function(t){return 0===t.qualityStandard||null==t.qualityStandard}))),1===this.supervision_record?this.tableData=this.tableData.filter((function(t){return t.supervisionRecord>0})):0===this.supervision_record&&(this.tableData=this.tableData.filter((function(t){return 0===t.supervisionRecord||null==t.supervisionRecord}))),1===this.disability_check?this.tableData=this.tableData.filter((function(t){return t.disabilityCheck>0})):0===this.disability_check&&(this.tableData=this.tableData.filter((function(t){return 0===t.disabilityCheck||null==t.disabilityCheck})))},getList:function(){var t=this;this.tableData=[],this.listLoading=!0,Object(s["a"])().get("/api/company_production/getAllList",{agriculturalClassification:this.agriculturalClassification,companyType:this.companyType,pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,townId:this.townId}).then((function(e){t.tableData=e,t.srcData=e,t.total=t.tableData.length,t.tableData.forEach((function(e){e.nowGrade=t.getGradeString(e.grade)})),t.filterList(),setTimeout((function(){t.listLoading=!1}),500)})).catch((function(e){console.error(e),t.tableData=[],t.total=0,setTimeout((function(){t.listLoading=!1}),500)}))},getGradeString:function(t){var e="";switch(t){case"A":e=3;break;case"B":e=2;break;case"C":e=1;break;default:e=3}return e},rowIndex:function(t){var e=t.row,a=t.rowIndex;e.rowIndex=a},order:function(t){return this.page.pageSize*(this.page.pageIndex-1)+t.rowIndex+1}}},b=h,g=(a("56b0"),a("2877")),v=Object(g["a"])(b,i,n,!1,null,"3cbba793",null);e["default"]=v.exports},9650:function(t,e,a){},ac6a:function(t,e,a){for(var i=a("cadf"),n=a("0d58"),l=a("2aba"),r=a("7726"),o=a("32e9"),s=a("84f2"),c=a("2b4c"),u=c("iterator"),d=c("toStringTag"),p=s.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=n(f),b=0;b<h.length;b++){var g,v=h[b],y=f[v],m=r[v],w=m&&m.prototype;if(w&&(w[u]||o(w,u,p),w[d]||o(w,d,v),s[v]=p,y))for(g in i)w[g]||l(w,g,i[g],!0)}},cd1c:function(t,e,a){var i=a("e853");t.exports=function(t,e){return new(i(t))(e)}},e853:function(t,e,a){var i=a("d3f4"),n=a("1169"),l=a("2b4c")("species");t.exports=function(t){var e;return n(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!n(e.prototype)||(e=void 0),i(e)&&(e=e[l],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=chunk-eb8dcf84.d0e5d340.js.map