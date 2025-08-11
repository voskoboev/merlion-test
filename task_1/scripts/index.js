import DataProvider from "./classes/DataProvider.js";
import DataTransformer from "./classes/DataTransformer.js";
import SelectManager from "./classes/SelectManager.js";

const dataProvider = new DataProvider("./data/products.json");
const data = await dataProvider.getFetchedData();

const dataTransformer = new DataTransformer(data.notArchive);
const transformedData = dataTransformer.getObjectToArrayTransformedData();

const select = new SelectManager(".select", transformedData);

select.addEventListener("change", (ev) => {
  console.log("Selected Option Data:", ev.detail);
});
