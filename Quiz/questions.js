


class Questions {
    constructor(data) {
        this.qustion = document.getElementById("questions");
        this.category = document.getElementById("type");
        this.next = document.getElementById("next");
        this.current = document.getElementById("current");
        this.total = document.getElementById("total");
        this.final=document.getElementById("final")
        this.quiz=document.getElementById("quiz")
        this.userAnswer=document.getElementById("yourAnswer")
        this.theRightAnswers =document.getElementById("theRightAnswers")
        this.again=document.getElementById("again")
        this.finalResult=document.getElementById("score")
        this.again.addEventListener("click",this.reload)
        this.answersEle = [
            document.getElementById("a1"),
            document.getElementById("a2"),
            document.getElementById("a3"),
            document.getElementById("a4"),
        ];
        this.allAnswers=[]
        this.count = 0;
        this.data = data;
        this.answers;
        this.right;
        this.score=0;
        this.next.addEventListener("click", this.nextQue);
        this.renderQuestion();
    }
    renderQuestion() {
        this.qustion.innerHTML = this.data[this.count].question;
        this.category.innerHTML = `category: ${this.data[this.count].category}`;
        this.current.innerHTML = this.count + 1;
        this.total.innerHTML = this.data.length;
        this.right = this.data[this.count].correct_answer;
        console.log(this.right);
        this.answers = [...this.data[this.count].incorrect_answers, this.right];
        console.log(this.answers);
        this.addAnswer();
    }



    addAnswer = () => {
        this.answersEle.forEach((ele, index) => {
            if(this.answers[index]===undefined){
                ele.innerHTML =''
            }else{
                ele.innerHTML =
                    '<input type="radio" name="radio" style="margin-right:8px;" class=" accent-violet-700 ">'
                    + this.answers[index];
            }
        });
        this.check().then((selectedValue) => {
            console.log("Selected Value:", selectedValue);
            this.answer(selectedValue)
        });
    };

    check = () => {
        return new Promise((resolve, reject) => {
            const radioButtons = document.querySelectorAll('input[name="radio"]');
            radioButtons.forEach((radioButton) => {
                radioButton.addEventListener("change", () => {
                    const selectedValue = radioButton.nextSibling.textContent;
                    resolve(selectedValue);
                });
            });
        });
    };
    answer=(checkedEle)=>{
        this.allAnswers.push(checkedEle)
        if(checkedEle ===this.right){
            this.score++
        }
        this.handle()
        this.finally()
    }
    handle=()=>{
        console.log(this.allAnswers);
        this.userAnswer.innerHTML+=` ${this.count+1} - ${this.allAnswers[this.count]} <br>`
        this.theRightAnswers.innerHTML+= `${this.count+1} - ${this.right} <br>`
    }
    nextQue = () => {
        this.count++;
        this.data.length - 1 >= this.count ? this.renderQuestion() : null;
    };
    finally=()=>{
        console.log(this.count);
    if(this.count===this.data.length-1){
        this.quiz.style.display = 'none';
        this.final.style.display = 'flex';
        this.finalResult.innerHTML=`your score is ${this.score}/${this.count+1}`
    }
    }
    reload=()=>{
        location.reload()
    }
}

export {Questions};


