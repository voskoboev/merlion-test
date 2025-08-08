class DataTransformer {
  #initialData;

  constructor(initialData) {
    this.#initialData = initialData;
  }

  getFromObjectToArrayTransformedData() {
    const array = [];

    for (const key in this.#initialData) {
      array.push(this.#initialData[key]);
    }

    return array;
  }
}

export default DataTransformer