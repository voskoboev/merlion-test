// const fd = new FormData();
// fd.append("alias", "notebooks");
// "https://digma.ru/catalog/get-products-in-group/",
// {
// method: "POST",
// body: fd,
// }

class DataProvider {
  #path;
  #options;
  #data;

  constructor(path, options = {}) {
    this.#path = path;
    this.#options = options;
  }

  getFetchedData = async () => {
    try {
      const res = await fetch(this.#path, this.#options);

      if (!res.ok) {
        throw new Error("Data fetch is failed");
      }

      this.#data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 700));

      return this.#data;
    } catch (err) {
      console.error(err);
    }
  };
}

export default DataProvider;
