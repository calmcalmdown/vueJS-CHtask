<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived" v-if="isEnterprise>-1">农残自检</el-breadcrumb-item>
        <el-breadcrumb-item class="actived" v-else>农残检测</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div v-if="typeof this.creditCode == 'undefined'" class="select_label no-margin-left">乡镇</div>
        <div v-else class="select_label no-margin-left" style="display: none">乡镇</div>
        <el-select
          v-if="typeof this.creditCode == 'undefined'"
          v-model="currTown"
          
          @change="getList"
        >
          <el-option
            v-for="item in township"
            :key="item.id"
            :label="item.name"
            :value="item.divisionCode"
            size="large"
          ></el-option>
        </el-select>
        <div v-else class="select_label">{{ getCompanyName() }}</div>
        <div class="select_label">项目</div>
        <el-select v-model="itemValue"  @change="getList" filterable>
          <el-option v-for="item in items" :key="item.id" :label="item.item" :value="item.item"></el-option>
        </el-select>
        <div class="select_label">样品</div>
        <el-select v-model="samplesValue" filterable  @change="getList">
          <el-option
            v-for="item in samples"
            :key="item.id"
            :label="item.sample"
            :value="item.sample"
          ></el-option>
        </el-select>
        <div class="select_label">定性</div>
        <el-select v-model="result"  @change="getList">
          <el-option v-for="item in results" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="select_label" v-if="isShowSearchOption">检测单位</div>
        <el-select
          filterable
          v-model="detectionUnitValue"
          @change="getList"
          v-if="isShowSearchOption"
        >
          <el-option
            v-for="item in detectionUnit"
            :key="item.id"
            :label="item.detectUnit"
            :value="item.detectUnit"
          ></el-option>
        </el-select>
      </div>
      <div class="iptBox">
        <el-row class="w-100">
          <el-col :span="5">
            <div class="select_label no-margin-left">开始日期</div>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="startDate"
              @change="getList"
            ></el-date-picker>
          </el-col>
          <el-col :span="5">
            <div class="select_label no-margin-left">结束日期</div>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="endDate"
              @change="getList"
            ></el-date-picker>
          </el-col>
          <el-col :span="5" class="flex-center">
            <el-button
              size="small"
              v-on:click="handleDownload"
              type="success"
              plain
              :disabled="totalNo<1"
            >导出表格</el-button>
            <el-button
              size="small"
              v-if="typeof this.creditCode != 'undefined'"
              type="primary"
              plain
              v-on:click="$router.go(-1)"
            >返回</el-button>
            <el-button
              size="small"
              v-else
              plain
              type="primary"
              v-on:click="$router.go(-1)"
              style="display: none;"
            >返回</el-button>
            <span class="margin-left-20 margin-top-10-IE">
              总计
              <b class="blue-colored">{{ totalNo }}</b> 条检测
            </span>
          </el-col>
          <el-col :span="9" class="flex-center justify-right" style="height:40px">
            <el-button
              size="small"
              type="success"
              icon="el-icon-plus"
              v-if="isShowCheckbox != 0"
              plain
              @click="actionConfirm(1)"
            >添加到专项1</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-minus"
              v-if="isShowCheckbox != 0"
              plain
              @click="actionConfirm(0)"
              style="margin-right:10px"
            >从专项1移除</el-button>
            <el-checkbox
              class="margin-top-10-IE float-right-IE"
              v-model="isShowCheckbox"
              true-label="1"
              false-label="0"
              @change="showCheckbox"
              :disabled="totalNo<1"
            >专项1:绿色优质农产品生产基地</el-checkbox>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="alert_dialogVisible" width="30%" modal>
          <span>
            <i class="el-icon-warning">&nbsp;请选择 !!!</i>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="alert_dialogVisible = false" type="primary" plain>取消</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
          <span>
            <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
            <el-button size="small" :type="btnColor" @click="updateSelectedRows()" plain>确认</el-button>
          </span>
        </el-dialog>
      </div>
      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
        >
          <el-table-column label width="35" v-if="isShowCheckbox != 0">
            <template slot-scope="{ row }">
              <el-checkbox
                style="margin-left:auto"
                @change="changeCheckStatus(row.id)"
                v-model="checked[row.id]"
                true-label="1"
                false-label="0"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
          <el-table-column prop="no" label="编号"></el-table-column>
          <el-table-column prop="item" label="检测项目"></el-table-column>
          <el-table-column prop="sample" label="样品名称"></el-table-column>
          <el-table-column prop="source" label="来源"></el-table-column>
          <el-table-column prop="resultDl" label="定量结果"></el-table-column>
          <el-table-column prop="resultDx" label="定性结果">
            <template slot-scope="{ row }">
              {{
              detect(row.resultDx)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="detectTime" label="检测时间" width="120">
            <template slot-scope="{ row }">{{ row.detectTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="detectUnit" label="检测单位" width="150"></el-table-column>
          <el-table-column prop="operator" label="检验员"></el-table-column>
          <el-table-column label="专项1">
            <template slot-scope="{ row }">
              <i v-if="row.specialFlag == 1" class="el-icon-check"></i>
              <i v-else></i>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Storage from "store";
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "disabilityCheck",
  components: { Pagination },
  data() {
    return {
      isEnterprise: "",
      listLoading: false,
      creditCode: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      totalNo: 0,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      township: [{ id: "-1", name: "全部", divisionCode: -1 }],
      currTown: -1,
      status: 1,
      tableData: [],
      items: [{ id: "-1", item: "全部" }],
      itemValue: "全部",
      samples: [{ id: 0, sample: "全部" }],
      samplesValue: "全部",
      results: [
        { id: -1, name: "全部" },
        { id: 0, name: "不合格" },
        { id: 1, name: "合格 " },
        { id: 2, name: "疑似" }
      ],
      result: -1,
      detectionUnit: [{ id: -1, detectUnit: "全部" }],
      detectionUnitValue: "全部",
      startDate: "",
      endDate: "",
      isShowCheckbox: 0,
      selectedRows: [],
      alert_dialogVisible: false,
      confirm_dialogVisible: false,
      btnColor: "",
      action: "",
      companyData: [],
      filename: "农残检测",
      checked: [],
      isShowSearchOption: null
    };
  },
  created() {
    this.isEnterprise = Storage.get("authData").indexOf("ent");
    this.isShowSearchOption = Storage.get("authList").find(
      x => x.privilegeCode == "searchdisabilityCheck"
    )
      ? true
      : false;
    this.getTown();
    this.getItem();
    this.getSample();
    this.getDetectUnit();
    this.getList();
    this.getCompanyProduction();
    this.creditCode = this.$route.query.creditCode;
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "编号",
          "检测项目",
          "样品名称",
          "来源",
          "定量结果",
          "定性结果",
          "检测时间",
          "检测单位",
          "检验员",
          "专项1"
        ];
        const filterVal = [
          "no",
          "item",
          "sample",
          "source",
          "resultDl",
          "resultDx",
          "detectTime",
          "detectUnit",
          "operator",
          "specialFlag"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          bookType: "csv"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "resultDx") {
            return this.filterResultDx(v[j]);
          }
          if (j === "detectTime") {
            return v[j].substr(0, 10);
          }
          if (j === "specialFlag") {
            if (v[j] === 1) {
              return "是";
            } else {
              return "";
            }
          }
          return v[j];
        })
      );
    },
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyData = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getItem() {
      Request()
        .get("/api/disability_check/item")
        .then(response => {
          this.items = this.items.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSample() {
      Request()
        .get("/api/disability_check/sample ")
        .then(response => {
          this.samples = this.samples.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetectUnit() {
      Request()
        .get("/api/disability_check/detect_unit")
        .then(response => {
          this.detectionUnit = this.detectionUnit.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getList() {
      this.listLoading = true;
      let tempDateTime = "";
      if (this.endDate) {
        tempDateTime =
          this.endDate.getFullYear() +
          "-" +
          parseInt(this.endDate.getMonth() + 1) +
          "-" +
          this.endDate.getDate() +
          "T" +
          "23:59:59";
      }
      
      Request()
        .get("/api/disability_check/all", {
          creditCode: this.$route.query.creditCode,
          detectUnit: this.identifyValue(this.detectionUnitValue),
          detectTimeFrom: this.startDate,
          detectTimeTo: tempDateTime,
          sample: this.identifyValue(this.samplesValue),
          item: this.identifyValue(this.itemValue),
          resultDx: this.result,
          townDivisionCode: this.currTown == -1 ? "" : this.currTown,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "detect_time"
        })
        .then(response => {
          this.tableData = response.data;
          this.total = response.total;
          this.totalNo = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    identifyValue(val) {
      if(val == "全部") return "-1";
      if(val == "") return "";
      else return val;
    },
    getCompanyName() {
      let product = this.companyData.find(
        x => x.creditCode === this.creditCode
      );
      if (product) {
        return product.companyName;
      } else {
        return "";
      }
    },
    detect(no) {
      if (no == "" || no == "0") return "不合格";
      if (no == "1") return "合格";
      else return "疑似";
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    goAdd() {
      this.$router.push({ path: "addDisabilityCheck" });
    },
    changeCheckStatus(id) {
      let index = this.selectedRows.indexOf(id);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[id] == 1) {
        this.selectedRows.push(id);
      }
    },
    actionConfirm(action) {
      this.action = action;
      this.updateSelectedRows();
    },
    updateSelectedRows() {
      for (let index in this.selectedRows) {
        this.confirm_dialogVisible = false;
        this.listLoading = true;
        Request()
          .put(
            "/api/disability_check/update_special_flag/" +
              this.selectedRows[index] +
              "?specialFlag=" +
              this.action
          )
          .then(response => {
            setTimeout(() => {
              this.listLoading = false;
            }, 0.5 * 1000);
            this.selectedRows = [];
            this.checked = [];
            this.isShowCheckbox = 0;
            this.getList();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showCheckbox() {
      if (this.isShowCheckbox == 0) {
        this.selectedRows = [];
        this.checked = [];
      }
    },
    filterResultDx(id) {
      switch (id) {
        case 0:
          return "不合格";
        case 1:
          return "合格";
        case 2:
          return "疑似";
        default:
          return "不合格";
      }
    }
  }
};
</script>

<style scoped></style>
