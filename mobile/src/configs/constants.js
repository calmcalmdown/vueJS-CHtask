let environment = "production";
// let environment = "local";

let Urls = {
  API_BASE_URL: () => {

    if (environment == "local") {
      return "http://118.31.54.197:8040";
    } else if (environment == "production") {
      return "http://118.31.54.197:8040";
    }

    return "NOTHING"
  },
  DOWNLOAD_URL: () => {
    return "http://118.31.54.197:8040/api";
  }
};

let StorageKeys = {
  ACCESS_TOKEN_KEY: "access_token",

  REFRESH_TOKEN_KEY: "refresh_token"
};

export { Urls, StorageKeys };