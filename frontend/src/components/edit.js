import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {UrlManager} from "../utils/url-manager.js";

export class Edit {
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        this.init();
        this.input = document.getElementsByTagName('input');
    }

    async init() {
        const that = this;

        try {
            const response = await CustomHttp.request(config.host + '/operations/' + this.routeParams.id)

            if (response) {
                if (response.error) {
                    throw new Error(response.message)
                }
                this.categorie = response
                this.input[0].value = this.categorie.type;
                if (this.categorie.type === 'income') {
                    this.input[0].value = 'доход'
                }

                if (this.categorie.type === 'expense') {
                    this.input[0].value = 'расход'
                }
                this.input[0].setAttribute('disabled', 'disabled');
                this.input[1].setAttribute('disabled', 'disabled');
                this.input[1].value = this.categorie.category
                this.input[2].value = this.categorie.amount
                this.input[3].value = this.categorie.date
                this.input[4].value = this.categorie.comment

            }
        } catch (error) {
            return console.log(error);
        }

        const create = document.getElementById('create');
        create.onclick = function () {
            that.create(this);
        }
        const cancel = document.getElementById('cancel');
        cancel.onclick = function () {
            location.href = '#/all';
        }
    }


   async create() {
       try {
           const response = await CustomHttp.request(config.host + '/operations/' + this.routeParams.id,
               'PUT', {
                   type: this.input[0].value,
                   category: this.input[1].value,
                   amount:this.input[2].value,
                   comment:this.input[4].value,
                   date:this.input[3].value,
               })

           if (response.status < 200 || response.status >= 300) {
               throw new Error(response.message);
           }
           location.href = '#/all'
       } catch (error) {
           return console.log(error);
       }
    }
}