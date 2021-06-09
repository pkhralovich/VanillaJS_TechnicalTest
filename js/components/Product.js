export default class Product {

    /**
     * Creates an instance of a Product component. Throws an error if no data is given.
     * @param {*} data State/data of the component. Must contain the id, the price, the description and the image 
     *                 of the product. Also may have a formula to apply.
     * @param {*} config Optional. Allows to configure the component. Expected an object with the following props:
     *                      -  currency: the currency of the price (€, $, etc)
     *                      -  decimal_places: the number of decimals to show
     */
    constructor(data, config = undefined) {
        if (!data) throw "Missing component data";

        this.data = data;
        this.element = undefined;

        this.input = undefined;
        this.saveButton = undefined;
        this.cancelButton = undefined;
        this.editButton = undefined;

        if (config) this.config = config;
        else this.config = { currency: "€", decimal_places: 2 }
    }

    build(parent) {
        let parser = new DOMParser();
        let html = `<li id="product_${this.data.id}" class="product-container-grid">
                    <!-- ORIGINAL PRODUCT -->
                    <p class="product-description original"> ${this.data.description} </p>
                    <img class="product-image original" src="${this.data.picture}">
                    <p class="label original"> Original price </p>
                    <p class="product-price original"> ${this.formatPrice(true)} </p>
        
                    <!-- FORMULA -->
                    <p class="label formula">Formula</p>
                    <img class="arrow-right first" src="images/arrow-right.svg">
                    <input type="text" class="formula-editor" placeholder="$price * 2" value="${this.getFormula()}" readonly/>
                    <img class="arrow-right second" src="images/arrow-right.svg">

                    <div class="buttons">
                        <button class="edit" onclick="editFormula('${this.data.id}')">Edit</button>

                        <button class="cancel negative" onclick="cancelModification('${this.data.id}')" hidden>Cancel</button>
                        <button class="save" onclick="saveFormula('${this.data.id}')" hidden>Save</button>
                    </div>

                    <!-- MODIFIED PRODUCT -->
                    <p class="product-description modified"> ${this.data.description} </p>
                    <img class="product-image modified" src="${this.data.picture}">
                    <p class="label modified"> Modified price </p>
                    <p class="product-price modified"> ${this.formatPrice(false)} </p>
                </li>`;

        let oldElement = this.element;
        this.element = parser.parseFromString(html, 'text/html').body.firstChild;

        this.input = this.element.querySelector("input.formula-editor");

        let baseSelector = `.buttons`
        this.editButton = this.element.querySelector(baseSelector + " .edit");
        this.editButton.addEventListener("click", this.onClickEdit.bind(this));
        
        this.cancelButton = this.element.querySelector(baseSelector + " .cancel");
        this.cancelButton.addEventListener("click", this.onClickCancel.bind(this));

        this.saveButton = this.element.querySelector(baseSelector + " .save");
        this.saveButton.addEventListener("click", this.onClickSave.bind(this));

        if (oldElement) parent.replaceChild(this.element, oldElement);
        else parent.appendChild(this.element);
    }

    onClickEdit() {
        this.setButtonsVisibility(true);
        this.setInputStatus(true);
    }

    onClickCancel() {
        this.setButtonsVisibility(false);
        this.setInputStatus(false);
        this.cancelModification();
    }

    onClickSave() {
        this.setButtonsVisibility(false);
        this.setInputStatus(false);
        this.saveFormula();
    }

    /**
     * @param {*} isOriginal Tells if the price is the original or not
     * @returns
     * @memberof Product
     */
    formatPrice(isOriginal) {
        if (this.data.price) {
            if (isOriginal) return `${this.data.price.toFixed(this.config.decimal_places)} ${this.config.currency} `;
            else {
                 //TODO: Apply formula
                return `${this.data.price.toFixed(this.config.decimal_places)} ${this.config.currency} `;
            }
        }
        else return "";
    }

    /**
     * @returns The formula in user format
     * @memberof Product
     */
    getFormula() {
        return this.data.formula ? this.data.formula : "N/D";
    }

    /**
     * Sets the formula input status according with the current status
     * @param {*} productId Id of the product affected
     * @param {*} editing Current status
     */
    setInputStatus(editing) {
        this.input.readOnly = !editing;

        if(editing) this.input.classList.add("editable");
        else this.input.classList.remove("editable");

        if (this.input.value === "N/D") this.input.value = "";
    }

    /**
     * Sets the visibility of the buttons associated to one product according with the current status
     * @param {*} productId Id of the product
     * @param {*} editing Current status
     */
    setButtonsVisibility(editing) {
        if (editing) {
            this.editButton.style.display = "none";
            this.cancelButton.style.display = "inline-block";
            this.saveButton.style.display = "inline-block";
        } else {
            this.editButton.style.display = "inline-block";
            this.cancelButton.style.display = "none";
            this.saveButton.style.display = "none";
        }
    }

    /**
     * Cancels the modification of the formula
     * @memberof Product
     */
    cancelModification() {
        this.input.value = this.getFormula();
    }


    saveFormula() {
        //TODO: Validate and store the formula
        this.build(this.element.parentElement);
    }
}