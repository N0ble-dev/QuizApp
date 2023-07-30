

import {Questions} from "./questions.js";
class Settings {
    constructor() {
        this.getAmount = this.getAmount.bind(this);
        this.getData = this.getData.bind(this);
        this.quizDom = document.querySelector('#quiz');
        this.settingsElement = document.querySelector('#settings');
        this.category = document.querySelector('#category');
        this.numberOfQuestions = document.querySelector('#nQustiones');
        this.startButton = document.querySelector('#start');
        this.startButton.addEventListener("click", this.getData)
        this.difficulty = [
            document.querySelector('#easy'),
            document.querySelector('#medium'),
            document.querySelector('#hard'),
        ];
        this.questions={}
    }
    async getData() {
        console.log("Before Fetch");
        const difficult= this.getDifficult();
        const categor= this.category.value;
        const amount= this.getAmount()
        try {
            let myData = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categor}&difficulty=${difficult}`);
            let response = await myData.json();
            let result= response.results;
            console.log(result);
            this.questions= new Questions(result)
            this.settingsElement.style.display = 'none';  
            this.quizDom.style.display = 'block'
        } catch (reason) {
            console.log(`Reason: ${reason}`);
        } finally {
            console.log("After Fetch");
        }
    }
    getAmount() {
        let value1;
        value1 = this.numberOfQuestions.value;
        return value1

    }
    getDifficult=()=>{
            let theTarget=this.difficulty.filter((ele)=>ele.checked)
            return theTarget[0].id
}
}
export { Settings }