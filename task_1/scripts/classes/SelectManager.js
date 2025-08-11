class SelectManager extends EventTarget {
  #selectListCssId = "select-list";
  #selectListCssClass = "select__list";
  #selectListOptionCssClass = "select__option";
  #selectListOptionImageCssClass = "select__option-img";
  #selectHeaderActivationClass = "select__header--active";
  #optionsListActivationCssClass = "select__list--active";
  #selectHeaderCssClassSelector = ".select__header";
  #selectOutputCssClassSelector = ".select__output";
  #selectListOptionCssClassSelector = `.${this.#selectListOptionCssClass}`;
  #selectListCssClassSelector = `.${this.#selectListCssClass}`;
  #selectOptionsListKeyDownEventKey = "Enter";
  #select;
  #selectHeader;
  #selectOutput;
  #selectList;
  #selectListOptions;
  #selectOptionsArray;
  #selectOptionData;

  constructor(selectElementSelector, selectOptionsArray = []) {
    super();

    this.#select = document.querySelector(selectElementSelector);
    this.#selectOptionsArray = selectOptionsArray;

    this.#selectHeader = this.#select.querySelector(
      this.#selectHeaderCssClassSelector
    );

    this.#selectOutput = this.#select.querySelector(
      this.#selectOutputCssClassSelector
    );

    this.#createSelect();
    this.#enableSelectOutput();

    this.#selectListOptions = this.#select.querySelectorAll(
      this.#selectListOptionCssClassSelector
    );

    this.#selectOutput.addEventListener("click", this.#toggleOptionsList);
    this.#selectOutput.addEventListener(
      "keydown",
      this.#toggleOptionsListOnKeyDown
    );

    this.#selectList.addEventListener("click", this.#chooseSpecificOption);
    this.#selectList.addEventListener(
      "keydown",
      this.#chooseSpecificOptionOnKeyDown
    );
  }

  #findSelectedOptionData = (id) => {
    this.#selectOptionData = this.#selectOptionsArray.find(
      (option) => option.itemId === parseInt(id)
    );
  };

  #enableSelectOutput = () => {
    this.#selectOutput.disabled = false;
  };

  #createSelect = () => {
    const selectListElement = document.createElement("div");
    selectListElement.id = this.#selectListCssId;
    selectListElement.classList.add(this.#selectListCssClass);
    selectListElement.role = "listbox";

    this.#select.append(selectListElement);

    this.#selectList = this.#select.querySelector(
      this.#selectListCssClassSelector
    );

    this.#selectOptionsArray.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.id = option.itemId;
      optionElement.classList.add(this.#selectListOptionCssClass);
      optionElement.tabIndex = 0;
      optionElement.role = "option";
      optionElement.ariaSelected = false;

      const titleElement = document.createElement("span");
      titleElement.textContent = option.fullName;

      optionElement.append(titleElement);

      const imgElement = document.createElement("img");
      imgElement.classList.add(this.#selectListOptionImageCssClass);
      imgElement.src = option.photo;
      imgElement.alt = option.fullName;
      imgElement.decoding = "async";
      optionElement.append(imgElement);

      this.#selectList.append(optionElement);
    });
  };

  #generateSelectEvent = () => {
    const changeEvent = new CustomEvent("change", {
      detail: this.#selectOptionData,
    });
    this.dispatchEvent(changeEvent);
  };

  #changeOptionsAriaSelectedToFalse = () => {
    this.#selectListOptions.forEach((el) => {
      el.ariaSelected = false;
    });
  };

  #toggleOptionsList = () => {
    this.#selectOutput.ariaExpanded = this.#selectList.classList.toggle(
      this.#optionsListActivationCssClass
    );
    this.#selectHeader.classList.toggle(this.#selectHeaderActivationClass);
  };

  #toggleOptionsListOnKeyDown = (ev) => {
    if (
      document.activeElement === this.#selectOutput &&
      ev.key === this.#selectOptionsListKeyDownEventKey
    ) {
      ev.preventDefault();
      this.#toggleOptionsList();
    }
  };

  #chooseSpecificOption = (ev) => {
    const optionElement = ev.target.closest(
      this.#selectListOptionCssClassSelector
    );

    if (!optionElement) {
      return;
    }

    this.#findSelectedOptionData(optionElement.id);
    this.#selectOutput.value = this.#selectOptionData.fullName;
    this.#generateSelectEvent();
    this.#changeOptionsAriaSelectedToFalse();
    optionElement.ariaSelected = true;
    this.#selectOutput.setAttribute("aria-activedescendant", optionElement.id);
    this.#toggleOptionsList();
  };

  #chooseSpecificOptionOnKeyDown = (ev) => {
    if (ev.key !== this.#selectOptionsListKeyDownEventKey) {
      return;
    }

    ev.preventDefault();
    this.#chooseSpecificOption(ev);
    this.#selectOutput.focus();
  };
}

export default SelectManager;
