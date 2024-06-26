<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-if="isShowAddButton">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item v-else>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">主营产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button
            size="small"
            type="primary"
            v-if="isShowAddButton"
            @click="$router.push(`/productionSubject/mainProduct/create/${id}`)"
            plain
            >添加</el-button
          >
          <el-button size="small" type="primary" plain @click="$router.go(-1)"
            >返回</el-button
          >
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column
          :formatter="order"
          label="序号"
          width="70"
        ></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="doOrganic" label="是否为有机产品" class-name="text-center">
          <template slot-scope="{ row }">{{
            row.doOrganic ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column prop="atunitprice" label="单价"></el-table-column>
        <el-table-column prop="productArea" label="产地"></el-table-column>
        <el-table-column prop="variety" label="品种"></el-table-column>
        <el-table-column prop="specification" label="规格"></el-table-column>
        <el-table-column prop="grade" label="评级">
          <template slot-scope="{ row }">
            {{ filterGradeName(row.grade) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operations"
          label="操作"
          width="270"
          class-name="text-right"
        >
          <template slot-scope="{ row }">
            <el-button
              size="small"
              v-on:click="showSamplingRecord(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              >第三方抽检记录</el-button
            >
            <el-button
              size="small"
              v-on:click="showProductBatch(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              >产品批次</el-button
            >
            <el-button
              size="small"
              v-on:click="showProductVariety(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="isShowAddButton"
              >品种定义</el-button
            >
            <el-button
              size="small"
              v-on:click="showProductGrade(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="isShowAddButton"
              >定义等级</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="operations" label width="350" class="text-left">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              v-on:click="showInventoryDynamics(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              >库存动态</el-button
            >
            <el-button
              size="small"
              v-on:click="goToEditMainProduct(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="isShowAddButton"
              >修改</el-button
            >
            <el-button
              size="small"
              v-on:click="deleteBatch(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              >删除</el-button
            > 
            <el-button
              size="small"
              v-on:click="showProcessDefinition(row)"
              type="success"
              plain
              class="no-margin-left"
              style="margin-bottom: 5px;"
              v-if="isShowAddButton"
              >作业定义</el-button
            >
            <el-button
              size="small"
              v-on:click="showProductProperty(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="isShowAddButton"
              >属性管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "mainProduct",
  components: { Pagination },
  data() {
    return {
      gradeData:null,
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      radio: "1",
      tableData: [],
      listLoading: true,
      isShowAddButton: null
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addMainProduct"
    )
      ? true
      : false;
    await this.getProductGrade();
    this.getList();
  },
  methods: {
    showSamplingRecord(row) {
      this.$router.push(
        `/productionSubject/mainProduct/thirdPartySamplingRecord/${row.productId}`
      );
    },
    showProductBatch(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/productBatch/${row.productId}`,
        query: { companyId: this.id }
      });
    },
    showInventoryDynamics(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/inventoryDynamics/${this.$route.params.id}`,
        query: { productId: row.productId }
      });
    },
    showProcessDefinition(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/processDefinition/${this.$route.params.id}`,
        query: { productId: row.productId }
      });
    },
    showProductProperty(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/productProperty/${this.$route.params.id}`,
        query: { productId: row.productId }
      });
    },
    goToEditMainProduct(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/edit/${row.productId}`
      });
    },
    showProductVariety(row) {
      this.$router.push({
        path: `/productVariety/${row.productId}`
      });
    },
    showProductGrade(row) {
      this.$router.push({
        path: `/productionGrade/${row.productId}`
      });
    },
    deleteBatch(row) {
      Request()
        .delete("/api/product_production/delete/"+row.productId)
        .then(response => {
          this.getList();
        })
        .catch(error => {
          console.error(error);
        });
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/product_production/all", {
          company_id: this.id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "productId"
        })
        .then(response => {
          this.tableData = response.data;
          this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getProductGrade() {
      return Request()
        .get("/api/product_grade/all", {
          sortBy: "gradeSort"
        })
        .then(response => {
          this.gradeData = response.data;
        })
        .catch(error => {});
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    filterGradeName(id) {
      let grade = this.gradeData.find(x => x.id == id);
      if (grade) {
        return grade.gradeName;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./mainProduct.scss";
</style>
