<template>
<!-- 重写逻辑 开始 -->
  <div class="root">
    <mt-header fixed title="首页"></mt-header>
    <div class="header">
      <img src="../../images/header.jpg" />
    </div>
    <ul
      class="mui-table-view mui-grid-view mui-grid-9"
      v-if="token && authData"
    >
      <li
        v-if="authData.indexOf('ent') < 0"
        @click="regulatoryRecord"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120208.jpg" />
      </li>

      <li
        @click="productionPtandard"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120201.jpg" />
      </li>

      <li
        @click="companyDetails"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120202.jpg" />
      </li>

      <li
        @click="sincerity"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120203.jpg" />
      </li>

      <li
        @click="recognizeQRCode"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120204.jpg" />
      </li>
      <li
        v-if="authData.indexOf('ent') === 0"
        @click="productionRecord"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120205.jpg" />
      </li>

      <li
        v-if="authData.indexOf('ent') === 0"
        @click="inputsUse"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120206.jpg" />
      </li>

      <li
        v-if="authData.indexOf('ent') === 0"
        @click="complaintCommunication"
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
      >
        <img src="../../images/2019120207.jpg" />
      </li>
    </ul>
  </div>
  <!-- 重写逻辑 结束 -->
</template>

<script>
import Request from "@/configs/request.js";
import Storage from "store";
import TokenManager from "@/configs/token-manager";
import { MessageBox } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      authData: null,
      token: null
    };
  },
  methods: {
    exit() {
      setTimeout(() => {
        this.$router.push({
          path: "/login"
        });
      }, 500);
    },
    regulatoryRecord() {
      this.$router.push("/regulatoryRecord");
    },
    //生产标准
    productionPtandard() {
      this.$router.push("/productionPtandard");
    },
    //企业信息
    companyDetails() {
      this.$router.push("/enterpriseInformation");
    },
    //诚信公示
    sincerity() {
      this.$router.push("/sincerity");
    },
    recognizeQRCode() {
      this.$router.push("/recognizeQR");
    },
    //生产记录
    productionRecord() {
      this.$router.push("/productionRecord");
    },
    //投入品使用
    inputsUse() {
      this.$router.push("/inputsUse");
    },
    //投诉交流
    complaintCommunication() {
      this.$router.push("/complaintCommunication");
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    check() {
      if (
        TokenManager().accessToken &&
        !this.getParameterByName("accessToken")
      ) {
        window.history.replaceState({}, document.title, "/");
        this.token = TokenManager().accessToken;
        this.authData = Storage.get("authData");
        return "exist";
      } else {
        if (
          !this.getParameterByName("timestamp") ||
          !this.getParameterByName("accessToken") ||
          !this.getParameterByName("sign")
        )
          return false;

    
        const accessToken = this.getParameterByName("accessToken").replace(
          "%20",
          " "
        );
        return Request()
          .post("/api/user/getAuthByAliToken", {
            aliToken: accessToken
          })
          .then(
            success => {
              if (success) {
                Storage.set(
                  "authData",
                  JSON.parse(success.authListInfo).result[0].roleCode
                );
                Storage.set(
                  "userData",
                  JSON.parse(success.userInfo).result
                );
                this.authData = JSON.parse(
                  success.authListInfo
                ).result[0].roleCode;
                if (accessToken) {
                  TokenManager().accessToken = accessToken;
                  this.token = accessToken;
                }

                window.history.replaceState({}, document.title, "/");
                return Promise.resolve(success);
              }
            },
            error => {
              console.log(error);
              window.history.replaceState({}, document.title, "/");
              return Promise.reject(error);
            }
          );
      }
    }
  },
  created() {
    if (this.check()) {
      this.check() !== "exist" &&
        this.check().then(
          success => {
            if (!success) MessageBox.alert("无法获取用户信息", "提示");
          },
          error => {
            MessageBox.alert("Token 错误", "提示");
          }
        );
    } else {
      MessageBox.alert("确认 accessToken, sign, timestamp!!!", "提示").then(
        action => {
          console.log("failed");
          Storage.remove("authData");
          TokenManager().accessToken = "";
        }
      );
    }
  }
};
</script>

<style scoped>
.header {
  margin-top: 2.5rem;
  height: 12rem;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
.mint-tabbar{
  position: fixed!important;
}

img {
  width: 100%;
  height: 100%;
}
</style>
