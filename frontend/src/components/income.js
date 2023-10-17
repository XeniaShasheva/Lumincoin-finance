import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";


export class Income {

    constructor() {
        this.income = [];
        this.newElement = null;
        this.yesElement = null;
        this.noElement = null;
        this.init();

   }


    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income');
            if(result) {
                if(result.error) {
                    throw new Error(result.message);
                }
                this.income = result;

            }
        } catch (error) {
            console.log(error);
        }
        this.incomeProcess();
    }

    incomeProcess() {
        const mainOptionElement = document.getElementById('main');
        if(this.income && this.income.length > 0) {
            this.income.forEach(item => {
                const that = this;
                const main = document.createElement('div');
                main.className = 'main-item row';
                main.setAttribute('id', item.id)

                const incomeItem = document.createElement('div');
                incomeItem.className = 'income-item';
                incomeItem.setAttribute('id', item.id)
                incomeItem.style.width = '352px'

                const incomeCard = document.createElement('div');
                incomeCard.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                cardBody.setAttribute('id', item.id)

                const cardTitle = document.createElement('h5');
                cardTitle.innerText = item.title;

                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn btn-primary btnEdit';
                btnEdit.setAttribute('type', 'button');
                btnEdit.innerText = 'Редактировать';
                btnEdit.setAttribute('id', item.id);
                btnEdit.setAttribute('title', item.title)
                btnEdit.onclick = function () {
                    that.editProcess(this);
                }

                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger';
                btnDelete.setAttribute('type', 'button');
                btnDelete.innerText = 'Удалить';
                btnDelete.setAttribute('id', item.id)
                btnDelete.onclick = function () {
                         that.deleteProcess(this);
                    }

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(btnEdit);
                cardBody.appendChild(btnDelete);

                incomeCard.appendChild(cardBody);
                incomeItem.appendChild(incomeCard);

                mainOptionElement.insertBefore(incomeItem, mainOptionElement.firstChild);

            })
        }
        this.newProcess();
    }

    editProcess(element) {
       const dataId = element.getAttribute('id');
        const title = element.getAttribute('title');
        if (dataId) {
            location.href = '#/editIncome?id=' + dataId + '&type=' + title;
        }


    }

     deleteProcess(element) {
        let popup = document.getElementById('popup');
        popup.style.display = 'block';
        this.yesElement = document.getElementById('yes');
        this.noElement = document.getElementById('no');
        this.yesElement.onclick = async function () {
            const dataId = element.getAttribute('id');
            try {
                const result = await CustomHttp.request(config.host + '/categories/income/' + dataId, 'DELETE');
                if(result) {
                    if(result.error) {
                        throw new Error(result.message);
                    }
                    popup.style.display = 'none';
                    location.href = '#/income'


                }
            } catch (error) {
                console.log(error);
            }
        }

        this.noElement.onclick = function () {
            popup.style.display = 'none'
        }

    }

    newProcess() {
        this.newElement = document.getElementById('new');
        this.newElement.onclick = function () {
            window.location.href = '#/newIncome';
        }
    }

}
