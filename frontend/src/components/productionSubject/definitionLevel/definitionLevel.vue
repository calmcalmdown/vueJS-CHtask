<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>定义等级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button
          size="small"
          type="primary"
          @click="$router.push(`/productionGrade/create/${productId}`)"
          plain
        >添加</el-button>
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
        >
          <el-table-column :formatter="order" label="序号" width="180"></el-table-column>
          <el-table-column prop="gradeName" label="等级名称"></el-table-column>
          <el-table-column prop="gradeSort" label="等级排序"></el-table-column>
          <el-table-column prop="yield" label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                @click="$router.push({path:`/productionGrade/edit/${row.id}`})"
                plain
                type="success"
              >修改</el-button>
              <el-button size="small" @click="handleDelete(`${row.id}`)" plain type="danger">删除</el-button>
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
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request";
export default {
  name: "definitoinLevel",
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      productId: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: []
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getList();
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/product_grade/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          productId: this.productId,
          sortBy: "id"
        })
        .then(response => {
          this.tableData = response.data;
          this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          Request()
            .delete("/api/product_grade/delete/" + id)
            .then(response => {
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
    }
  }
};
</script>

