export class Expenses  {
    constructor() {
        this.editElement = null;
            this.deleteElement = null;
            this.newElement = null;
            this.yesElement = null;
            this.noElement = null;

        const that = this;
        this.editElement = document.getElementsByClassName('btnEdit');
        this.editElement.onclick = function () {
            that.editProcess()
        }
        this.deleteElement = document.getElementById('delete');
        this.deleteElement.onclick = function () {
            that.delete();
        }

        this.newElement = document.getElementById('new');
        this.newElement.onclick = function () {
            that.newProcess();

        }


    }


        editProcess() {
            window.location.href = '#/editExpenses';
        }

        delete() {
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
            window.location.href = '#/newExpenses';
        }

    }
