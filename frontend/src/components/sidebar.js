import {Balance} from "../utils/balanse.js";


export class Sidebar {
    constructor(target, config) {
        let balance = new Balance().init()

        document.getElementById('icon').onclick = function () {
            let logout = document.getElementById('logout');
            logout.style.display = 'block';


        }
    }
}

