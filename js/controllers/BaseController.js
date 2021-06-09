export default class BaseController {
    constructor() {
        if (this.constructor == BaseController) {
            throw new Error("Unable to instantiate BaseController, is intented to be an abstract class");
        }
    }

    endpoint() {
        //return "https://run.mocky.io/v3/2e50b034-7372-41ef-9636-fb64d5330421"; //8000 products (not able to mock a bigger call with mocky)
        return "https://run.mocky.io/v3/dd815968-9134-4734-9f19-bea5b7bb902e"; //1000 products
        //return "https://run.mocky.io/v3/22eb05a8-9650-450e-90a4-366567e2c088"; //10 products
    }

    /**
     * Retrieves all the data from the persistence system.
     * @param {Function} onResponse Callback on getting a response
     * @param {Function} onError Callback on getting an error
     * @memberof BaseController
     */
    getAll(onResponse, onError) {
        throw new Error("getAll must be implemented in the subclass");
    }

    /**
     * Stores the param product in the persistence system.
     * @param {Object} data Object to store
     * @param {Function} onResponse Callback on getting a response
     * @param {Function} onError Callback on getting an error
     * @memberof BaseController
     */
    save(data, onResponse, onError) {
        throw new Error("save must be implemented in the subclass");
    }
}