<template>
  <div class="box">
    <el-dialog
      :visible.sync="openDialog"
      width="90%"
      :before-close="handleClose"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-form-item label="年度：" class="margin-left-10">
          <el-row>
            <el-col :span="2">
              <el-input
                v-model="inYear"
                :rules="[
                  { required: true, message: '请插入', trigger: 'blur' },
                  { type: 'number', message: '插入号码', trigger: 'blur' }
                ]"
                :span="3"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="left-margin flex-box w-100 no-margin-IE">
          <el-row
            v-for="(rowData, index) in dynamicValidateForm.data"
            :key="index"
          >
            <el-col :span="1">
              <el-form-item class="margin-left-20">
                <el-checkbox
                  @change="changeCheckStatus(index)"
                  true-label="1"
                  false-label="0"
                  class="form-checkbox"
                  v-model="checked[index]"
                ></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="板块："
                :prop="'data.' + index + '.town'"
                :rules="{ required: true, message: '请选择', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-select v-model="rowData.town" class="w-100">
                <el-option
                  v-for="town in township"
                  :key="town.id"
                  :label="town.name"
                  :value="town.id"
                ></el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="种植业占比:"
                number
                :prop="'data.' + index + '.planting'"
                :rules="[                
                { type: 'number', message: '插入号码' }
              ]"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.planting"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="畜牧业占比:"
                :prop="'data.' + index + '.livestock'" 
                :rules="[                
                { type: 'number', message: '插入号码' }
              ]"               
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.livestock"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item
                label="绿色优质农产品占比:"
                :prop="'data.' + index + '.highQuality'"
                :rules="[                
                { type: 'number', message: '插入号码' }
                 ]"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.highQuality"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item
                label="下半年种植业预计占比:"
                :prop="'data.' + index + '.plantingHalfPlan'"
                :rules="[                
                { type: 'number', message: '插入号码' }
              ]"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.plantingHalfPlan"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item
                label="下半年畜牧业预计占比:"
                :prop="'data.' + index + '.livestockHalfPlan'"
                :rules="[                
                { type: 'number', message: '插入号码' }
              ]"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.livestockHalfPlan"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item
                label="绿色优质农产品预计占比:"
                :prop="'data.' + index + '.highQualityPlan'"
                :rules="[                
                { type: 'number', message: '插入号码' }
              ]"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.highQualityPlan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="margin-left-40 margin-top-20">
            <el-col :span="17">
              <el-button size="small" @click="addFormRow()" type="primary" plain
                >添加</el-button
              >
              <el-button
                size="small"
                @click="deleteSelectedRows()"
                type="danger"
                plain
                >删除</el-button
              >
            </el-col>
            <el-col :span="4" v-show="dynamicValidateForm.data.length > 0">
              <span>插入时间:&nbsp;</span>
              <el-date-picker
                type="date"
                v-model="registerTime"
                style="width:180px"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" v-show="dynamicValidateForm.data.length > 0">
              <el-button
                size="small"
                @click="onSubmit('dynamicValidateForm')"
                type="success"
                plain
                >保存</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="confirm_dialogVisible = false"
          type="primary"
          plain
          >取消</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="updateSelectedRows()"
          plain
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-container>
      <el-header class="margin-bottom-10">绿色优质农产品统计汇总</el-header>
      <div class="iptBox">
        <el-row class="w-80">
          <el-col :span="2">
            <el-button
              size="small"
              type="success"
              plain
              v-on:click="showAddDialog()"
              >添加</el-button
            >
          </el-col>
          <el-col :span="6">
            <span>开始日期:&nbsp;</span>
            <el-date-picker
              style="width:150px"
              type="date"
              v-model="registerTimeFrom"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <span>结束日期:&nbsp;</span>
            <el-date-picker
              style="width:150px"
              type="date"
              v-model="registerTimeTo"
            ></el-date-picker>
          </el-col>
          <el-col :span="4">
            <span>年度:&nbsp;</span>
            <el-input
              v-model="searchYear"
              class="w-60"
              @keyup.native="handleChange"
            ></el-input>
          </el-col>
          <el-col :span="1">
            <el-button
              size="small"
              type="primary"
              plain
              v-on:click="changeFilter()"
              class="margin-left-10"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
        highlight-current-row
        border
        :span-method="spanMethod"
      >
        <el-table-column :formatter="order" label="序号"></el-table-column>
        <el-table-column prop="town" label="板块"></el-table-column>
        <el-table-column prop="planting" label="种植业占比">
          <template slot-scope="{row}">
            {{row.planting = (row.planting == -1? 0:row.planting) }}
          </template>
        </el-table-column>
        <el-table-column prop="livestock" label="畜牧业占比">
          <template slot-scope="{row}">
            {{row.livestock = (row.livestock == -1? 0:row.livestock) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="highQuality"
          label="绿色优质农产品占比"
        >
        <template slot-scope="{row}">
            {{row.highQuality = (row.highQuality == -1? "/":row.highQuality) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="plantingHalfPlan"
          label="下半年种植业预计占比"
        >
          <template slot-scope="{row}">
            {{row.plantingHalfPlan = (row.plantingHalfPlan == -1? "/":row.plantingHalfPlan) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="livestockHalfPlan"
          label="下半年畜牧业预计占比"
        >
        <template slot-scope="{row}">
            {{row.livestockHalfPlan = (row.livestockHalfPlan == -1? "/":row.livestockHalfPlan) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="highQualityPlan"
          label="绿色优质农产品预计占比"
        >
        <template slot-scope="{row}">
            {{row.highQualityPlan = (row.highQualityPlan == -1? "/":row.highQualityPlan) }}
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "greenAgriculturalProducts",
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      inYear: 0,
      searchYear: new Date().getFullYear().toString(),
      openDialog: false,
      dynamicValidateForm: {
        data: []
      },
      selectedRows: [],
      township: [],
      confirm_dialogVisible: false,
      checked: [],
      registerTime: new Date().toString("YYYY-MM-DD"),
      registerTimeFrom: new Date(new Date().getFullYear(), 0, 1),
      registerTimeTo: new Date(),
      sendcount: 0,
      alert_dialogVisible: false,
      total: 0,
      tableData: [],
      listLoading: true
    };
  },
  created() {
    this.getTown();
    this.getData();
  },
  methods: {
    showAddDialog() {
      this.dynamicValidateForm.data = [];
      this.selectedRows = [];
      this.checked = [];
      this.inYear = Number(new Date().getFullYear());
      this.addFormRow();
      this.openDialog = true;
    },

    handleClose(done) {
      this.$confirm("您确定要关闭此对话框吗？")
        .then(_ => {
          this.getData();
          done();
        })
        .catch(_ => {});
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
    addFormRow() {
      this.dynamicValidateForm.data.push({
        town: "",
        fullYear: 0,
        halfYear: 0
      });
    },

    deleteSelectedRows() {
      if (this.selectedRows.length) {
        this.selectedRows = this.selectedRows.sort((a, b) => (a > b ? -1 : 1));
        for (let index in this.selectedRows) {
          let checkId = this.dynamicValidateForm.data[this.selectedRows[index]]
            .id;
          if (checkId) this.deletedRows.push(checkId);
          this.checked[this.selectedRows[index]] = false;
          this.dynamicValidateForm.data.splice(this.selectedRows[index], 1);
        }
        this.selectedRows = [];
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirm_dialogVisible = true;
        }
      });
    },

    changeCheckStatus(rowIndex) {
      let index = this.selectedRows.indexOf(rowIndex);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[rowIndex] == 1) {
        this.selectedRows.push(rowIndex);
      }
    },

    updateSelectedRows() {
      this.confirm_dialogVisible = false;
      this.openDialog = false;
      let updateTime = new Date();
      let createTime = new Date();
      this.listLoading = true;
      this.sendcount = 0;

      this.dynamicValidateForm.data.forEach(item => {
        let formdata = new FormData();
        formdata.append("createTime", createTime.toDateString("YYYY-MM-DD"));
        formdata.append("createUserId", Auth().user().id);
        formdata.append("highQuality", (item.highQuality==undefined || item.highQuality==""? -1: item.highQuality));
        formdata.append("highQualityPlan", (item.highQualityPlan==undefined || item.highQualityPlan==""? -1: item.highQualityPlan));
        formdata.append("id", 0);
        formdata.append("livestock", (item.livestock==undefined || item.livestock==""? -1: item.livestock));
        formdata.append("livestockHalfPlan", (item.livestockHalfPlan==undefined || item.livestockHalfPlan==""? -1: item.livestockHalfPlan));
        formdata.append("planting", (item.planting==undefined || item.planting==""? -1: item.planting));
        formdata.append("plantingHalfPlan", (item.plantingHalfPlan==undefined || item.plantingHalfPlan==""? -1: item.plantingHalfPlan));
        formdata.append(
          "registerTime",
          this.registerTime.toString("YYYY-MM-DD")
        );
        formdata.append("town", this.filterTownship(item.town));
        formdata.append("updateTime", updateTime.toDateString("YYYY-MM-DD"));
        formdata.append("updateUserId", Auth().user().id);
        formdata.append("year", this.inYear);

        Request()
          .post("/api/green/product_ratio/create", formdata)
          .then(res => {
            this.sendcount++;
            if (this.sendcount === this.dynamicValidateForm.data.length) {
              this.listLoading = false;
              this.getData();
            }
          });
      });
    },

    changeFilter() {
      this.getData();
    },
    filterTownship(townId) {
      let town = this.township.find(x => x.id === townId);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },
    handleChange() {
      if (this.searchYear > 1990) {
        this.registerTimeFrom = new Date(this.searchYear, 0, 1);
      }
    },

    getData() {
      this.listLoading = true;
      let toDate = new Date(this.registerTimeTo.getFullYear(),
                this.registerTimeTo.getMonth(),
                this.registerTimeTo.getDate(),
                23, 59, 59
              );

      Request()
        .get("/api/green/product_ratio/all", {
          registerTimeFrom:
            this.registerTimeFrom == "" || this.registerTimeFrom == null
              ? ""
              : this.registerTimeFrom,
          registerTimeTo:
            this.registerTimeTo == "" || this.registerTimeTo == null
              ? ""
              : toDate,
          sortBy: "id",
          year: this.searchYear
        })
        .then(res => {
          this.tableData = res.data;
          this.total = this.tableData.length;
          this.calcualteTotal();
          this.tableData.forEach(element => {
            
            element.planting = (element.planting == -1? "/":parseFloat(element.planting).toFixed(2) );
            element.livestock = (element.livestock == -1? "/":parseFloat(element.livestock).toFixed(2));
            element.highQuality = (element.highQuality == -1? "/":parseFloat(element.highQuality).toFixed(2));
            element.plantingHalfPlan = (element.plantingHalfPlan == -1? "/":parseFloat(element.plantingHalfPlan).toFixed(2));
            element.livestockHalfPlan = (element.livestockHalfPlan == -1? "/":parseFloat(element.livestockHalfPlan).toFixed(2));
            element.highQualityPlan = (element.highQualityPlan == -1? "/":parseFloat(element.highQualityPlan).toFixed(2));
            
          });
          this.listLoading = false;
        });
    },

    calcualteTotal() {
      let plantTotal = 0,
        liveTotal = 0,
        greenTotal = 0,
        expectedTotal = 0,
        estimateTotal = 0,
        greenHighTotal = 0;

      this.tableData.forEach(data => {
        plantTotal += (data.planting == -1? 0:data.planting);
        liveTotal += (data.livestock == -1? 0:data.livestock);
        greenTotal += (data.highQuality == -1? 0:data.highQuality);
        expectedTotal += (data.plantingHalfPlan == -1? 0:data.plantingHalfPlan);
        estimateTotal += (data.livestockHalfPlan == -1? 0:data.livestockHalfPlan);
        greenHighTotal += (data.highQualityPlan == -1? 0:data.highQualityPlan);
      });

      this.tableData.push({
        town: "合计",
        planting: plantTotal,
        livestock: liveTotal,
        highQuality: greenTotal,
        plantingHalfPlan: expectedTotal,
        livestockHalfPlan: estimateTotal,
        highQualityPlan: greenHighTotal
      });
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == this.tableData.length - 1) {
        if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 2
          };
        }
      }
    },

    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return row.rowIndex + 1;
    }
  }
};
</script>

<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}
</style>
