import {CustomHttp} from "../servises/custom-http.js";

export class Account  {

    constructor() {
        this.field = [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                // regex: /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/,
                valid: false,
            },
            {
                name: 'lastName',
                id: 'lastName',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                // regex: /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/,
                valid: false,
            },
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
            {
                name: 'passwordRepeat',
                id: 'passwordRepeat',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },

        ]

        const that = this;
        this.field.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateFields.call(that, item, this);
            }
        });
        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processAccount();
        }

    }


        validateFields(field, element) {
            let password = document.getElementById('password');
            let repeat = document.getElementById('passwordRepeat');
            if (!element.value || !element.value.match(field.regex)) {
                element.style.borderColor = 'red';
                field.valid = false;
            }     else {
                element.removeAttribute('style');
                field.valid = true;
            }


            if (password.value !== repeat.value) {
                password.style.borderColor = 'red';
                repeat.style.borderColor = 'red';
                password.valid = false;
                repeat.valid = false

            }
            else {
                password.removeAttribute('style');
                repeat.removeAttribute('style');
                password.valid = true;
                repeat.valid = true;
            }
            this.validateAccount();
        }
        validateAccount() {
            const validForm = this.field.every(item => item.valid);
            if (validForm) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return validForm;
        }

        async processAccount() {
            if(this.validateAccount()) {

                try {
                    const result = await CustomHttp.request('http://localhost:3000/api/signup', 'POST',{
                        name: this.field.find(item => item.name === 'name').element.value,
                        lastName: this.field.find(item => item.name === 'lastName').element.value,
                        email: this.field.find(item => item.name === 'email').element.value,
                        password: this.field.find(item => item.name === 'password').element.value,
                        passwordRepeat: this.field.find(item => item.name === 'passwordRepeat').element.value,
                    })
                    if(result) {
                        if(result.error || !result.user) {
                            throw new Error(result.message);
                        }
                        location.href = '#/income';
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }
