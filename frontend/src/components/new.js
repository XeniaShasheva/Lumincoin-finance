import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";



export class New {
    constructor(page){
        this.page=page;
        this.categories =null
        this.input = document.getElementsByTagName('input')
        this.itmType = document.getElementsByClassName('dropdown-item')
        this.id = document.location.href.split('=')[1]

        if(this.page === 'createIncome'){
            this.createErn()
        }else if (this.page === 'createExpense'){
            this.createCom()
        }
        this.cancel()

        let that = this
        for(let i = 0;i<this.input.length;i++){
            this.input[i].onchange=function(){
                that.validateForm();
            }
        }

    }


    createErn(){
        this.showTitle('Создание дохода', 'доход')
        this.itmTyp('income')
        let that = this
        create.onclick = function () {
            that.savingData(that.saveCategor(that.input[1].value),'income','/operations','POST')
        }
    }
    createCom(){
        this.showTitle('Создание расхода','расход')
        this.itmTyp('expense')
        let that = this
        create.onclick = function () {
            that.savingData(that.saveCategor(that.input[1].value),'expense','/operations','POST')
        }
    }
    async itmTyp(data){
        try{

            const result = await CustomHttp.request(config.host+'/categories/'+data)

            if(result){
                if(result.error){
                    throw new Error(result.message)
                }

                this.categories = result

                if(this.categories){
                    this.searchType()
                }
            }
        }catch(e){
            console.log(e)
        }
    }
    showTitle(text, type ){
        let input = this.input[0]
        document.getElementById('content-title').innerText = text
        input.value = type
        input.setAttribute('disabled', 'disabled')
    }
    cancel(){
        document.getElementById('cancel').onclick = function () {
            document.getElementById('form')
            location.href = '#/all'
        }
    }
    searchType(){
        let that =this


        const result = document.getElementById('dropdown-menu')
        let content = ''

        this.categories.forEach((itm)=>{
            content +=`<li><div class="dropdown-item" id='${itm.id}'>${itm.title}</div></li>`
        })
        result.innerHTML = content


        for(let i = 0; i<this.itmType.length;i++){
            this.itmType[i].onclick = function () {
                that.input[1].value = that.itmType[i].textContent

            }
        }
    }
    validateForm(){
        let that =this
        let create = document.getElementById('create')

        let y = false
        for(let i = 0;i<this.input.length-1;i++){
            if(!that.input[i].value){
                y = false
                return
            }else{
                y = true
            }
        }
        if(y === true){
            create.removeAttribute('disabled')
        }


    }
    async savingData(id,type,url,metod){
        try{
            const result = await CustomHttp.request(config.host+url,metod,{
                type: type,
                amount: this.input[2].value,
                date: this.input[3].value,
                comment: this.input[4].value ===true?this.input[4].value:' ',
                category_id:  Number(id)
            })

            if(result){
                location.href='#/all'
            }

        }catch(e){
            console.log(e)
        }
    }

    saveCategor(type){
        let idcategor=null
        for(let i = 0;i<this.categories.length;i++){
            if(this.categories[i].title===type){
                idcategor= this.categories[i].id
                break
            }
        }
        return idcategor
    }




    // constructor(page, type) {
    //     this.init();
    //     this.routeParams = UrlManager.getQueryParams();
    //     this.input = document.getElementsByTagName('input')
    //     this.page = page;
    //     this.type = type;
    //
    //
    // }
    //
    // async init() {
    //     if (this.page === '#/new1') {
    //         this.input[0].value = 'доход'
    //         this.type = 'income';
    //     }
    //
    //     try {
    //         const result = await CustomHttp.request(config.host + '/categories/expense');
    //         if (result) {
    //             if (result.error) {
    //                 throw new Error(result.message)
    //             }
    //             this.categories = result
    //         }
    //     } catch (error) {
    //         console.log(1)
    //     }
    //     const that = this;
    //     document.getElementById('createAll').onclick = function () {
    //         that.createIncome(this);
    //     }
    //
    // }
    //
    //
    // async createIncome(id) {
    //     if (this.input[0].value === 'доход') {
    //         try {
    //             const result = await CustomHttp.request(config.host + '/operations', 'POST', {
    //                 type: 'income',
    //                 amount: this.input[2].value,
    //                 date: this.input[3].value,
    //                 comment: this.input[4].value,
    //                 category_id: Number(id),
    //             })
    //             if (result) {
    //                 location.href = '#/all';
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         try {
    //             const result = await CustomHttp.request(config.host + '/operations', 'POST', {
    //                 type: 'expense',
    //                 category: this.input[1].value,
    //                 amount: this.input[2].value,
    //                 date: this.input[3].value,
    //                 comment: this.input[4].value,
    //                 category_id: Number(id),
    //             })
    //             if (result) {
    //                 location.href = '#/all';
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //
    // }


}