import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {UrlManager} from "../utils/url-manager.js";
export class EditIncome {
    constructor() {
        this.income = [];
        this.routeParams = UrlManager.getQueryParams();
        this.init();

    }

    init() {
        const that = this;
        let input = document.getElementById('input');
        input.value = this.routeParams.type;
        const save = document.getElementById('save');
        save.onclick = function () {
            that.saveIncome();
        }
        const cancel = document.getElementById('cancel');
        cancel.onclick = function () {
            location.href = '#/income'
        }


    }

    async saveIncome(){
        try {
            const response = await CustomHttp.request(config.host + '/categories/income/' + this.routeParams.id,
                'PUT', {
                    title: document.getElementById('input').value,
                })

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.message);
            }
            location.href = '#/income'
        } catch (error) {
            return console.log(error);
        }
    }
}