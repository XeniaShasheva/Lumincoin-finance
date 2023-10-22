import {Balance} from "../utils/balanse.js";


export class Sidebar {
    constructor() {
        let balance = new Balance().init();
        this.navLinks = document.getElementsByClassName('nav-link');
        this.toggleBtn = document.querySelector('.nav-link');
        this.collapsedLinks = document.getElementById('dashboard-collapse');
        this.incomeLink = document.getElementById('incomeSideBar');
        this.expenseLink = document.getElementById('expenseSidebar');
        this.init();
        this.active();
    }


    init() {
        document.getElementById('icon').onclick = function () {
            let logout = document.getElementById('logout');
            logout.style.display = 'block';

            let yesElement = document.getElementById('yesLogout');
            let noElement = document.getElementById('noLogout');
            let sidebar = document.getElementById('sidebar');
            yesElement.onclick = function () {
                logout.style.display = 'none';
                sidebar.style.display = 'none';
                location.href = '#/login';
                localStorage.clear();
            }
            noElement.onclick = function () {
                logout.style.display = 'none';
            }
        }
    }

    active() {
        document.querySelectorAll('.nav-link.active').forEach(item => item.classList.remove('active'));
        this.activeNavLink = Array.from(this.navLinks).find(item => location.hash.includes(item.id));
        if(this.activeNavLink) {
            if (this.activeNavLink === this.incomeLink || this.activeNavLink === this.expenseLink) {
                this.toggleBtn.classList.add('opened');
                this.toggleBtn.classList.remove('collapsed');
                this.toggleBtn.setAttribute('aria-expanded', 'true');
                this.collapsedLinks.classList.add('show');
            }
            this.activeNavLink.classList.add('active');
        }
    }


}

