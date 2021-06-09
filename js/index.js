import Product from './components/Product.js';
import ProductController from './controllers/ProductController.js';

const LIST_ID = "products-list";
const LIST_CAPTION_ID = "list-caption";
const LOADING_ID = "loading-container";
const NAV_ID = "nav-options";
const HAMBURGUER_ID = "hamburguer";

let navOptions;

let list;
let listCaption;

let hamburguer;
let productController;

window.onload = function() {
    //Uncomment to clear persistance
    localStorage.clear();

    list = document.getElementById(LIST_ID);
    listCaption = document.getElementById(LIST_CAPTION_ID);
    
    hamburguer = document.getElementById(HAMBURGUER_ID);
    hamburguer.addEventListener("click", onClickMenu);

    productController = new ProductController();
    productController.getAll(onGetSuccess, onGetError);
}

/**
 * Function that handles a click on the hamburguer menu icon
 */
function onClickMenu() {
    if (!navOptions) navOptions = document.getElementById(NAV_ID);

    if (navOptions.style.display != "block") navOptions.style.display = "block";
    else navOptions.style.display = "none";
}

/**
 * Handles a valid response from the API
 * @param {*} response HTTP response. At least has status and data.
 */
function onGetSuccess(response) {
    try {
        if (response.status == 200 && response.data) {
            list.innerHTML = "";

            response.data.forEach(p => {
                let component = new Product(p);
                component.build(list);
            });

            listCaption.innerText = `Showing ${response.data.length} of ${response.data.length}`;
            listCaption.style.display = "block";
        } else {
            list.innerHTML = "<p class='list-message'> Ups... Something went wrong. No data available! </p>";
        }
    } catch (error) {
        list.innerHTML = "<p class='list-message'> Ups... Something went wrong. </p>"
    }

    document.getElementById(LOADING_ID).style.display = "none";
}

/**
 * Handles an error durint an API call
 * @param {*} error
 */
function onGetError(error) {
    document.getElementById("loading-container").style.display = "none";
    list.innerHTML = "<p class='list-message'> Ups... Something went wrong. </p>"
}