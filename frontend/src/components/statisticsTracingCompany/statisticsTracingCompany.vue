<template>
  <div class="container customized" v-loading="listLoading">
    <div class="box padding-modified header statisticsTracingCompany" v-if="!listLoading"></div>
    <div class="box padding-modified body">
      <el-row class="W-100">
        <el-col :span="12" class="position-relative">
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >乡镇溯源企业统计</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">乡镇溯</span>
            <span style="color:#20beff;opacity:0.7">源企业统计</span>
          </h1>
          <div class="disability-chart chart-container" ref="chartpie1"></div>
        </el-col>
        <el-col :span="12" class="position-relative">
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >各乡镇监管记录上传数据的比例分布</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">各乡镇监管</span>
            <span style="color:#20beff;opacity:0.7">记录上传数据的比例分布</span>
          </h1>
          <div class="disability-chart chart-container margin-left-10" ref="chartpie2">
            <figure>
              <chart :options="pie" :init-options="initOptions" ref="pie" autoresize />
            </figure>
          </div>
        </el-col>
      </el-row>
      <el-row class="W-100 position-relative">
        <el-col>
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >各乡镇溯源记录上传数据统计</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">各乡镇溯源</span>
            <span style="color:#20beff;opacity:0.7">记录上传数据统计</span>
          </h1>
          <div class="w-100 flex-box disability-chart chart-container" ref="chartstick"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
const ECharts =()=>import('vue-echarts/components/ECharts.vue');
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

export default {
  name: "statisticsTracingCompany",
  components: {
    chart: ECharts
  },
  data() {
    return {
      listLoading: true,
      tableData: null,
      tableDataByCnt: null,
      companyStatics: null,
      companyStatics1: null,
      townList: null,
      colorList: [
        "#229efe",
        "#20beff",
        "#21e3ff",
        "#21ffda",
        "#1fffa6",
        "#61f779",
        "#96f65f",
        "#c9fb64",
        "#c9fb64",
        "#fbd661",
        "#f1be51",
        "#f68a63",
        "#f17263",
        "#ed6082",
        "#ee63ca",
        "#7366f4"
      ],
      is_ie: null,
      pie: {},
      initOptions: {
        renderer: "canvas"
      }
    };
  },
  created() {
    this.isIE();
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = [];
      this.tableDataByCnt = [];
      this.companyStatics = [];
      this.townList = [];

      Request()
        .get("/api/tracing/getCompanyStatis", {
          tracingTimeFrom: "",
          tracingTimeTo: "",
          sortBy: "cnt_company"
        })
        .then(res => {
          this.companyStatics = res.data;
          this.getTownlist();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getTownlist() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townList = response;
          this.getTableData();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getTableData() {
      this.companyStatics.forEach(res => {
        let town_id = res[1],
          townname = "";
        for (let i = 0; i < this.townList.length; i++) {
          if (this.townList[i].id === town_id) {
            townname = this.townList[i].name;
            break;
          }
        }

        this.tableData.push({
          townName: townname,
          companyCnt: res[0],
          pie1Label: townname,
          pie2Label: townname
        });
      });

      this.makePieChat1();
      this.makePieChat2();
    },
    getTableData1() {
      this.companyStatics1.forEach(res => {
        let town_id = res[4],
          townname = "";
        for (let i = 0; i < this.townList.length; i++) {
          if (this.townList[i].id === town_id) {
            townname = this.townList[i].name;
            break;
          }
        }

        this.tableDataByCnt.push({
          townName: townname,
          companyCnt: res[0],
          pie1Label: townname,
          pie2Label: townname
        });
      });

      this.listLoading = false;
    },

    makePieChat1() {
      Promise.all([
        import("@amcharts/amcharts4/core"),
        import("@amcharts/amcharts4/charts"),
        import("@amcharts/amcharts4/themes/animated")
      ]).then((modules) => {
        const am4core = modules[0];
        const am4charts = modules[1];
        const am4themes_animated = modules[2].default;
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create(this.$refs.chartpie1, am4charts.PieChart);
        Request()
          .get("/api/company_production/getTownCreditStatis", {
            createTimeFrom: "",
            createTimeTo: "",
            sortBy: "town_id"
          })
          .then(res => {
            this.companyStatics1 = res.data;
            this.getTableData1();
            chart.data = this.tableDataByCnt;
            this.makeStickChat();
          })
          .catch(err => {
            console.error(err);
          });

        chart.responsive.enabled = true;

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        let title = chart.titles.create();
        title.text = "乡镇溯源企业统计";
        title.fontSize = 5;
        title.marginBottom = 40;
        title.marginTop = 10;
        title.fill = am4core.color("#012f8a");

        pieSeries.dataFields.value = "companyCnt";
        pieSeries.dataFields.category = "pie1Label";
        pieSeries.labels.template.fill = "white";
        pieSeries.labels.template.truncate = true;
        pieSeries.labels.template.maxWidth = 150;
        pieSeries.labels.template.fontSize = 15;
        pieSeries.labels.template.text =
          "[bold '#20beff']{value.percent.formatNumber('#.0')}%[/] {category}";
        chart.innerRadius = am4core.percent(40);
        pieSeries.slices.template.fillOpacity = 1;
        pieSeries.ticks.template.fill = am4core.color("#FFF");
        pieSeries.ticks.template.strokeWidth = 1;
        pieSeries.ticks.template.strokeOpacity = 0.7;
        pieSeries.ticks.template.fillOpacity = 1;
        let colorSet = new am4core.ColorSet();
        colorSet.list = this.colorList.map(color => {
          return new am4core.color(color);
        });
        pieSeries.colors = colorSet;
        let hs = pieSeries.slices.template.states.getKey("hover");
        hs.properties.scale = 1;
        hs.properties.fillOpacity = 0.5;
        }).catch((e) => {
          console.error("Error when creating chart", e);
        }) 
      
    },

    makePieChat2() {
      this.tableData.sort(function(a, b) {
        return b.cnt - a.cnt;
      });
      let chartData = [];
      this.tableData.map(item => {
        chartData.push({
          value: item.companyCnt,
          name: item.townName
        });
      });
      this.pie = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "各站点农残检测上传数据统计",
            type: "pie",
            radius: "40%",
            center: ["54%", "50%"],
            data: chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                fontSize: 16,
                color: "#FFF",
                formatter: "{d}%: {b}"
              }
            }
          }
        ],
        color: this.colorList
      };
      let dataIndex = -1;
      let pie = this.$refs.pie;
      let dataLen = this.pie.series[0].data.length;

      setInterval(() => {
        pie.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex
        });
        dataIndex = (dataIndex + 1) % dataLen;
        pie.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex
        });
        // 显示 tooltip
        pie.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex
        });
      }, 1000);
    },

    makeStickChat() {
      Promise.all([
        import("@amcharts/amcharts4/core"),
        import("@amcharts/amcharts4/charts"),
        import("@amcharts/amcharts4/themes/animated")
      ]).then((modules) => {
        const am4core = modules[0];
        const am4charts = modules[1];
        const am4themes_animated = modules[2].default;
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create(this.$refs.chartstick, am4charts.XYChart);
        chart.data = this.tableDataByCnt;

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let title = chart.titles.create();
        title.text = "各乡镇溯源记录上传数据统计";
        title.fontSize = 5;
        title.marginBottom = 40;
        title.fill = am4core.color("#012f8a");

        categoryAxis.dataFields.category = "townName";
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.labels.template.fill = "white";
        categoryAxis.renderer.labels.template.rotation = -45;
        categoryAxis.renderer.labels.template.truncate = true;
        categoryAxis.renderer.labels.template.maxWidth = 150;
        categoryAxis.renderer.labels.template.fontSize = 15;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.line.strokeOpacity = 1;
        categoryAxis.renderer.line.strokeWidth = 2;
        categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.labels.template.fill = "white";
        valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = am4core.color("#3787ac");
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "companyCnt";
        series.dataFields.categoryX = "townName";
        series.name = "companyCnt";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = 1;
        var gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color("#08d3fc"));
        gradient.addColor(am4core.color("#4687eb"));
        gradient.rotation = 90;
        series.fill = gradient;
        let valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{companyCnt}";
        valueLabel.label.fill = am4core.color("#20beff");
        valueLabel.label.truncate = true;
        valueLabel.label.maxWidth = 150;
        valueLabel.label.fontSize = 15;
        valueLabel.label.truncate = false;
        valueLabel.label.dy = -10;
        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 0;
        // Chart code goes here
      }).catch((e) => {
        console.error("Error when creating chart", e);
      }) 
    },

    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
    },
    formatNumber(value) {
      return value / 1000 + "K";
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>
