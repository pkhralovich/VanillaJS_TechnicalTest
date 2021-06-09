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

        if (config) this.config = config;
        else this.config = { currency: "€", decimal_places: 2 }
    }

    build() {
        return `<li id="${this.data.id}" class="product-container-grid">
                    <!-- ORIGINAL PRODUCT -->
                    <p class="product-description original"> ${this.data.description} </p>
                    <img class="product-image original" src="${this.data.picture}">
                    <p class="label original"> Original price </p>
                    <p class="product-price original"> ${this.formatPrice(true)} </p>
        
                    <!-- FORMULA -->
                    <p class="label formula">Formula</p>
                    <img class="arrow-right first" src="images/arrow-right.svg">
                    <input type="text" class="formula-editor" placeholder="$price * 2" value="${this.data.formula ? this.data.formula : "N/D"}"/>
                    <img class="arrow-right second" src="images/arrow-right.svg">

                    <div class="buttons">
                        <button onclick="editFormula('${this.data.id}')">Edit</button>

                        <button class="negative" onclick="cancelModification('${this.data.id}')" hidden>Cancel</button>
                        <button onclick="saveFormula('${this.data.id}')" hidden>Save</button>
                    </div>

                    <!-- MODIFIED PRODUCT -->
                    <p class="product-description modified"> ${this.data.description} </p>
                    <img class="product-image modified" src="${this.data.picture}">
                    <p class="label modified"> Modified price </p>
                    <p class="product-price modified"> ${this.formatPrice(false)} </p>
                </li>`;
    }

    formatPrice(isOriginal) {
        if (this.data.price) {
            //Check if is original or not
            return `${this.data.price.toFixed(this.config.decimal_places)} ${this.config.currency} `;
        }
        else return "";
    }
}