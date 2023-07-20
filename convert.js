const json2xls = require("json2xls");
const axios = require("axios");
const fs = require("fs");

const url = "";
const cookie = "";

const requestData = async (index) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer SEU_TOKEN",
      "Content-Type": "application/json",
      VtexIdclientAutCookie: cookie,
      "rest-range": `resources=0-10`,
    },
  });

  const data = response.data;

  data.forEach((e) => {
    e.productList = JSON.stringify(e.productList);
    e.createdBy_USER = JSON.stringify(e.createdBy_USER);
  });

  return data;
};

requestData().then((data) => {
  const xls = json2xls(data);
  fs.writeFileSync("output.xls", xls, "binary");
});
