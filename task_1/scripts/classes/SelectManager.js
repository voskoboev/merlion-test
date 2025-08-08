class SelectManager {
  #selectListCssId = "select-list";
  #selectListCssClass = "select__list";
  #selectListOptionCssClass = "select__list-option";
  #selectListOptionImageCssClass = "select__list-option-img";
  #optionsListActivationCssClass = "select__list--active";
  #selectHeaderActivationClass = "select__header--active";
  #selectOutputCssClassSelector = ".select__output";
  #selectHeaderCssClassSelector = ".select__header";
  #selectListOptionCssClassSelector = `.${this.#selectListOptionCssClass}`;
  #selectListCssClassSelector = `.${this.#selectListCssClass}`;
  #optionsListKeyDownEventKey = "Enter";
  #select;
  #selectHeader;
  #selectOutput;
  #selectList;
  #selectListOptions;
  #optionsArray;
  #selectOptionData;

  constructor(selectElementSelector, optionsArray = []) {
    this.#select = document.querySelector(selectElementSelector);
    this.#optionsArray = optionsArray;

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

    this.#selectOutput.addEventListener(
      "click",
      this.#handleToggleOptionsListActivationOnClick
    );

    this.#selectOutput.addEventListener(
      "keydown",
      this.#handleToggleOptionsListActivationOnKeyDown
    );

    this.#selectListOptions.forEach((el) => {
      el.addEventListener("click", this.#handleOptionSelectionOnClick);
      el.addEventListener("keydown", this.#handleOptionSelectionOnKeyDown);
    });
  }

  getSelectedOptionData = () => {
    return this.#selectOptionData;
  };

  #findSelectedOptionData = (id) => {
    this.#selectOptionData = this.#optionsArray.find(
      (option) => option.itemId === parseInt(id)
    );

    console.log("selectOptionData", this.#selectOptionData);
  };

  #enableSelectOutput = () => {
    this.#selectOutput.disabled = false;
  };

  #createSelect = () => {
    const selectListElement = document.createElement("div");
    selectListElement.id = this.#selectListCssId;
    selectListElement.classList.add(this.#selectListCssClass);
    selectListElement.classList.add(this.#optionsListActivationCssClass);

    this.#select.append(selectListElement);

    this.#selectList = this.#select.querySelector(
      this.#selectListCssClassSelector
    );

    console.log("create select");

    this.#optionsArray.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.tabIndex = 0;
      optionElement.ariaSelected = false;
      optionElement.classList.add(this.#selectListOptionCssClass);
      optionElement.role = "option";
      optionElement.id = option.itemId;

      const titleElement = document.createElement("span");
      titleElement.textContent = option.fullName;
      optionElement.append(titleElement);

      const imgElement = document.createElement("img");
      imgElement.classList.add(this.#selectListOptionImageCssClass);
      imgElement.src = option.photo;
      imgElement.decoding = "async";
      imgElement.alt = option.fullName;
      optionElement.append(imgElement);

      this.#selectList.append(optionElement);
    });
  };

  #toggleOptionsListActivation = () => {
    this.#select.ariaExpanded = this.#selectList.classList.toggle(
      this.#optionsListActivationCssClass
    );
    this.#selectHeader.classList.toggle(this.#selectHeaderActivationClass);
  };

  #changeSelectOptionsAriaSelectedToFalse = () => {
    this.#selectListOptions.forEach((el) => {
      el.ariaSelected = false;
    });
  };

  #selectInvidualOption = (ev) => {
    this.#changeSelectOptionsAriaSelectedToFalse();
    this.#selectOutput.value = ev.currentTarget.textContent;
    this.#select.setAttribute("aria-activedescendant", ev.currentTarget.id);
    ev.currentTarget.ariaSelected = true;
    this.#findSelectedOptionData(ev.currentTarget.id);
    this.#toggleOptionsListActivation();
  };

  #handleToggleOptionsListActivationOnClick = () => {
    this.#toggleOptionsListActivation();
  };

  #handleToggleOptionsListActivationOnKeyDown = (ev) => {
    if (
      document.activeElement === this.#selectOutput &&
      ev.key === this.#optionsListKeyDownEventKey
    ) {
      this.#toggleOptionsListActivation();
    }
  };

  #handleOptionSelectionOnClick = (ev) => {
    this.#selectInvidualOption(ev);
  };

  #handleOptionSelectionOnKeyDown = (ev) => {
    if (
      document.activeElement === ev.target &&
      ev.key === this.#optionsListKeyDownEventKey
    ) {
      this.#selectInvidualOption(ev);
      this.#selectOutput.focus();
    }
  };
}

export default SelectManager;
