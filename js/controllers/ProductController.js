import BaseController from './BaseController.js';

export default class ProductController extends BaseController {
    constructor() {
        super();
    }
    
    getAll(onResponse, onError) {
        //No API available. Mock some kind of persistence with localStorage.
        //TODO: Remove localStorage use with a real API.
        let products = localStorage.getItem("products");

        if (products) onResponse({ status: 200, data: JSON.parse(products) });
        else {
            axios.get(this.endpoint())
                .then(response => {
                    //No API available. Mock some kind of persistence with localStorage.
                    //TODO: Remove localStorage use with a real API.
                    if (response.status == 200 && response.data) {
                        products = response.data;
                        localStorage.setItem("products", JSON.stringify(products)); 
                    }

                    onResponse(response);
                })
                .catch(onError)
        }
    }

    save(product, onResponse, onError) {
        if (product.id) {
            //No API available. Mock some kind of persistence with localStorage.
            //TODO: Remove localStorage use with a real API.
            
            let products = JSON.parse(localStorage.getItem("products"));
            let index = products.findIndex(item => item.id == product.id);

            if (index >= 0) {
                products[index] = product;
                localStorage.setItem("products", JSON.stringify(products));

                onResponse({ status: 200, data: product });
            } else onError({ status: 404 });
        } else throw new Error("Unable to save a product without and ID");
    }
}