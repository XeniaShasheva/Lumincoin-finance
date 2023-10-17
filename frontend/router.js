import {Account} from "./components/accountCreate.js";
import {Entrance} from "./components/entrance.js";
import {Income} from "./components/income.js";
import {Expenses} from "./components/expenses.js";
import {EditIncome} from "./components/editIncome.js";
import {NewIncome} from "./components/newIncome.js";
import {NewExpenses} from "./components/newExpenses.js";
import {EditExpenses} from "./components/editExpenses.js";
import {All} from "./components/all.js";
import {New} from "./components/new.js";
import {Edit} from "./components/edit.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Авторизация',
                template: 'templates/entrance.html',
                load: () => {
                    new Entrance();
                }
            },
            {
                route: '#/accountCreate',
                title: 'Регистрация',
                template: 'templates/accountCreate.html',
                load: () => {
                    new Account();
                },
            },
            {
                route: '#/income',
                title: 'Категории Доходов',
                template: 'templates/income.html',
                load: () => {
                    new Income();
                }
            },
            {
                route: '#/expenses',
                title: 'Категории Расходов',
                template: 'templates/expenses.html',
                load: () => {
                    new Expenses();
                },
            },
            {
                route: '#/editIncome',
                title: 'Редактирование категории Доходов',
                template: 'templates/editIncome.html',
                load: () => {
                    new EditIncome();
                },
            },
            {
                route: '#/newIncome',
                title: 'Создание категории Доходов',
                template: 'templates/newIncome.html',
                load: () => {
                    new NewIncome();
                },
            },
            {
                route: '#/newExpenses',
                title: 'Создание категории Расходов',
                template: 'templates/newExpenses.html',
                load: () => {
                    new NewExpenses();
                },
            },
            {
                route: '#/editExpenses',
                title: 'Редактирование категории Расходов',
                template: 'templates/editExpenses.html',
                load: () => {
                    new EditExpenses();
                },
            },
            {
                route: '#/all',
                title: 'Доходы и Расходы',
                template: 'templates/all.html',
                load: () => {
                    new All();
                },
            },
            {
                route: '#/new',
                title: 'Создание Дохода/Расхода',
                template: 'templates/new.html',
                load: () => {
                    new New();
                },
            },
            {
                route: '#/edit',
                title: 'Редактирование Дохода/Расхода',
                template: 'templates/edit.html',
                load: () => {
                    new Edit();
                },
            },
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        });

        if(!newRoute) {
            window.location.href = '#/';
            return;
        }

        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        document.getElementById('title').innerText = newRoute.title;
        newRoute.load();
    }
}