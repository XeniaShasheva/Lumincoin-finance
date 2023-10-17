import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class NewExpenses {
    constructor() {
        this.init();
    }

    init() {
        const that = this
        const newExpense = document.getElementById('newExpense');
        newExpense.onclick = function () {
            that.newExpense();
        };
        const deleteNew = document.getElementById('deleteExpense');
        deleteNew.onclick = function () {
            location.href = '#/expenses';
        }
    }

    async newExpense() {
        try {
            const response = await CustomHttp.request(config.host + '/categories/expense/', 'POST', {
                title: document.getElementById('newExpenseInput').value,
            });

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.message);
            }
            location.href = '#/expenses';
        } catch (error) {
            console.log(error);
        }


    }


}