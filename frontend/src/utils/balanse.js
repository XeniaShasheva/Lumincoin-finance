import { CustomHttp } from "../services/custom-http.js";
import configs from "../../config/config.js"

export class Balance {
    constructor(){
        this.data = null
        this.init()
    }

    async init(){
        try{

            const result = await CustomHttp.request(configs.host+'/balance')

            if(result){
                if(result.error){
                    throw new Error(result.message)
                }

                this.data = result
                document.getElementById('balance').innerText = this.data.balance+'$'

            }
        }catch(e){
            console.log(e)
        }
    }
}