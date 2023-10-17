import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {UrlManager} from "../utils/url-manager.js";
export class EditExpenses {
    constructor() {
        this.expense = [];
        this.routeParams = UrlManager.getQueryParams();
        this.init();
    }

    init() {
        const that = this;
        let input = document.getElementById('inputExpense')
        input.value = this.routeParams.type
        const save = document.getElementById('saveExpense');
        save.onclick = function () {
            that.saveExpense();
        };
        const deleteExpenses = document.getElementById('deleteEdit');
        deleteExpenses.onclick = function () {
            location.href = "#/expenses";
        }
    }

    async saveExpense(){
        try {
            const response = await CustomHttp.request(config.host + '/categories/expense/' + this.routeParams.id,
                'PUT', {
                    title: document.getElementById('inputExpense').value,
                })

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.message);
            }
            location.href = '#/expenses'
        } catch (error) {
            return console.log(error);
        }
    }


}