import {CustomHttp} from "../servises/custom-http.js";
import {Auth} from "../servises/auth.js";
export class Entrance {

    constructor() {
        this.checkElement = null;
        this.processElement = null;
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
            }
        ];


        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });
        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }

        this.checkElement = document.getElementById('check');
        this.checkElement.onchange = function () {
            that.validateForm();
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
        if (validForm) {
            this.processElement.removeAttribute('disabled');
            this.processElement.style.backgroundColor = 'blue';
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return validForm;
    }

    async processForm() {
        if (this.validateForm()) {
            try {
                const result = await CustomHttp.request('http://localhost:3000/api/login', 'POST', {
                    email: this.fields.find(item => item.name === 'email').element.value,
                    password: this.fields.find(item => item.name === 'password').element.value,
                })
                if (result) {
                    if (!result.tokens.accessToken || !result.tokens.refreshToken || !result.user ) {
                        throw new Error(result.message);
                    }

                    Auth.setTokens(result.tokens);
                    location.href = '#/income';
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}



