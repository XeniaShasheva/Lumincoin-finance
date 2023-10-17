import {CustomHttp} from "../services/custom-http.js";
import {Auth} from "../services/auth.js";
import config from "../../config/config.js";
export class Form {

    constructor(page) {
        this.checkElement = null;
        this.processElement = null;
        this.page = page;
        // this.sidebar();
        this.fields = [

            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ];

        if (this.page === 'signup') {
            this.fields.unshift({
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^([А-Я][а-я]*\s+)+[А-Я][а-я]*\s*$/,
                    // regex: /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/,
                    valid: false,
                },)
            this.fields.push({
                name: 'passwordRepeat',
                id: 'passwordRepeat',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },)
            //
            // let sidebar = document.getElementById('sidebar');
            // let parent = sidebar.parentNode;
            //
            // parent.removeChild(sidebar);
            //
            // document.getElementById('flex').style.display = 'block';
        }
        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        if (this.page === 'login') {
            this.checkElement = document.getElementById('check');
            this.checkElement.onchange = function () {
                that.validateForm();
            }
        }


        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }
    }


    validateField(fields, element) {
        if (!element.value || !element.value.match(fields.regex)) {
            element.style.borderColor = 'red';
            fields.valid = false;
        } else {
            element.removeAttribute('style');
            fields.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.checkElement ? this.checkElement && validForm : validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled');
            this.processElement.style.backgroundColor = 'blue';
        } else {
            this.processElement.setAttribute('disabled', '');
        }
        return isValid;
    }

    async processForm() {
        if (this.validateForm()) {
            if (this.page === 'signup') {
                try {
                    const response = await CustomHttp.request(config.host + '/signup', 'POST', {

                            name: this.fields.find(item => item.name === 'name').element.value.split(' ')[1],
                            lastName: this.fields.find(item => item.name === 'name').element.value.split(' ')[0],
                            email: this.fields.find(item => item.name === 'email').element.value,
                            password: this.fields.find(item => item.name === 'password').element.value,
                            passwordRepeat: this.fields.find(item => item.name === 'passwordRepeat').element.value,

                    });

                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.message);
                    }
                    location.href = '#/income';

                } catch (error) {
                    console.log(error)
                }
            }

            try {
                const result = await CustomHttp.request(config.host +'/login', 'POST', {
                    email: this.fields.find(item => item.name === 'email').element.value,
                    password: this.fields.find(item => item.name === 'password').element.value,
                    rememberMe: this.checkElement === false,

                })
                if (result) {
                    if(!result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name ||
                        !result.user.lastName ) {
                    // if ( !result.tokens.accessToken || !result.tokens.refreshToken || !result.user) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                    Auth.setUserInfo({
                        name: result.user.name,
                        lastName: result.user.lastName,
                    })
                    location.href = '#/all';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}



