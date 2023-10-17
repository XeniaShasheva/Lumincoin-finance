import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../servises/custom-http.js";

export class Income {

    constructor() {
        this.income = [];
        this.editElement = null;
        this.deleteElement = null;
        this.newElement = null;
        this.yesElement = null;
        this.noElement = null;
        this.routeParams = UrlManager.getQueryParams();
        this.init();

        const that = this;
        this.editElement = document.getElementsByClassName('btnEdit');
        this.editElement.onclick = function () {
            that.editProcess()
        }
        this.deleteElement = document.getElementById('delete');
        this.deleteElement.onclick = function () {
            that.deleteProcess();
        }

        this.newElement = document.getElementById('new');
        this.newElement.onclick = function () {
            that.newProcess();

        }
    }


    async init() {
        try {
            const result = await CustomHttp.request('http://localhost:3000/api/categories/income')
            if(result) {
                if(result.error || !result.user) {
                    throw new Error(result.message);
                }
                this.income = result;
                this.incomeProcess();
            }
        } catch (error) {
            console.log(error);
        }
    }

    incomeProcess() {
        const mainOptionElement = document.getElementById('main');
        if(this.income && this.income.length > 0) {
            this.income.forEach(item => {
                // const main = document.createElement('div');
                // main.className = 'main-item row';

                const incomeItem = document.createElement('div');
                incomeItem.className = 'income-item';

                const incomeCard = document.createElement('div');
                incomeCard.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const cardTitle = document.createElement('h5');
                cardTitle.innerText = item.name;

                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn btn-primary btnEdit';
                btnEdit.setAttribute('type', 'button');

                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger';
                btnDelete.setAttribute('type', 'button');


                cardBody.appendChild(cardTitle);
                cardBody.appendChild(btnEdit);
                cardBody.appendChild(btnDelete);

                incomeCard.appendChild(cardBody);
                incomeItem.appendChild(incomeCard);

                mainOptionElement.appendChild(incomeItem);

            })
        }
    }

    editProcess() {
        window.location.href = '#/editIncome';
    }

    deleteProcess() {
        let popup = document.getElementById('popup');
        popup.style.display = 'block';
        this.yesElement = document.getElementById('yes');
        this.noElement = document.getElementById('no');

        this.yesElement.onclick = function () {

        }

        this.noElement.onclick = function () {
            popup.style.display = 'none'
        }

    }

    newProcess() {
        window.location.href = '#/newIncome';
    }

}
