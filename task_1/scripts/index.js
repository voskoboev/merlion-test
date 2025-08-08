import DataProvider from "./classes/DataProvider.js";
import DataTransformer from "./classes/DataTransformer.js";
import SelectManager from "./classes/SelectManager.js";

const dataProdiver = new DataProvider("./static/data.json");
const data = await dataProdiver.getFetchedData();

const dataTransformer = new DataTransformer(data.notArchive);
const transformedData = dataTransformer.getFromObjectToArrayTransformedData();

new SelectManager(".select", transformedData);

console.log("transformed data", transformedData);
