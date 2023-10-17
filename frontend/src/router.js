import {Form} from "./components/form.js";
import {Income} from "./components/income.js";
import {Expenses} from "./components/expenses.js";
import {EditIncome} from "./components/editIncome.js";
import {NewIncome} from "./components/newIncome.js";
import {NewExpenses} from "./components/newExpenses.js";
import {EditExpenses} from "./components/editExpenses.js";
import {All} from "./components/all.js";
import {New} from "./components/new.js";
import {Edit} from "./components/edit.js";
import {Main} from "./components/main.js";
import {Sidebar} from "./components/sidebar.js";
import {Auth} from "./services/auth.js";



export class Router {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.layout = document.getElementById('layout');
        this.userInfo = document.getElementById('userInfo');
        this.routes = [
            {
                route: '#/login',
                title: 'Авторизация',
                template: 'templates/login.html',
                load: () => {
                    new Form('login');

                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                load: () => {
                    new Form('signup');

                },
            },
            {
                route: '#/main',
                title: 'Главная',
                template: 'templates/main.html',
                load: () => {
                    new Main();
                    new Sidebar();
                },
            },
            {
                route: '#/income',
                title: 'Категории Доходов',
                template: 'templates/income.html',
                load: () => {
                    new Income();
                    new Sidebar();
                }
            },
            {
                route: '#/expenses',
                title: 'Категории Расходов',
                template: 'templates/expenses.html',
                load: () => {
                    new Expenses();
                    new Sidebar();
                },
            },
            {
                route: '#/editIncome',
                title: 'Редактирование категории Доходов',
                template: 'templates/editIncome.html',
                load: () => {
                    new EditIncome();
                    new Sidebar();
                },
            },
            {
                route: '#/newIncome',
                title: 'Создание категории Доходов',
                template: 'templates/newIncome.html',
                load: () => {
                    new NewIncome();
                    new Sidebar();
                },
            },
            {
                route: '#/newExpenses',
                title: 'Создание категории Расходов',
                template: 'templates/newExpenses.html',
                load: () => {
                    new NewExpenses();
                    new Sidebar();
                },
            },
            {
                route: '#/editExpenses',
                title: 'Редактирование категории Расходов',
                template: 'templates/editExpenses.html',
                load: () => {
                    new EditExpenses();
                    new Sidebar();
                },
            },
            {
                route: '#/all',
                title: 'Доходы и Расходы',
                template: 'templates/all.html',
                load: () => {
                    new All();
                    new Sidebar();
                },
            },
            {
                route: '#/creationIncome',
                title: 'Создание Дохода/Расхода',
                template: 'templates/new.html',
                load: () => {
                    new New('createIncome');
                    new Sidebar();
                },
            },
            {
                route: '#/creationExpense',
                title: 'Создание Дохода/Расхода',
                template: 'templates/new.html',
                load: () => {
                    new New('createExpense');
                    new Sidebar();
                },
            },
            {
                route: '#/edit',
                title: 'Редактирование Дохода/Расхода',
                template: 'templates/edit.html',
                load: () => {
                    new Edit();
                    new Sidebar();
                },
            },
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        if(urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/';
            return;
        }
        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if(!newRoute) {
            window.location.href = '#/login';
            return;
        }

        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        document.getElementById('title').innerText = newRoute.title;

        const userInfoName = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);

        if(userInfoName && accessToken){
            this.userInfo.innerText = userInfoName.name + ' ' + userInfoName.lastName;
            this.layout.style.display = 'flex';
            this.sidebar.style.display = 'flex';
        } else {
            this.layout.style.display = 'block';
            this.sidebar.style.display = 'none';
        }
        newRoute.load();
    }
}