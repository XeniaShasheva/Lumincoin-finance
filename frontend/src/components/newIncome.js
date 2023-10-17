import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class NewIncome {
    constructor() {
        this.init();

    }

    init() {
        const that = this
        const newIncome = document.getElementById('newIncome');
        newIncome.onclick = function () {
            that.new();
        };
        const deleteNew = document.getElementById('deleteNew');
        deleteNew.onclick = function () {
            location.href = '#/income';
        }
    }

    async new() {
        try {
            const response = await CustomHttp.request(config.host + '/categories/income/', 'POST', {
                title: document.getElementById('newIncomeInput').value,
            });

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.message);
            }
            location.href = '#/income';
        } catch (error) {
            console.log(error);
        }


    }

}
