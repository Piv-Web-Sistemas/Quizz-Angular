import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent  implements OnInit{

title:string=""
questions:any
questionSelected:any

resposta:string[]= []
respostaSelecionada:string=""

questionIndex:number=0
questionMaxIndex:number=0

finished:boolean=false


  constructor(){ }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished=false
      this.title = quizz_questions.title
      this.questions= quizz_questions.questions
      this.questionSelected= this.questions[this.questionIndex]

      this.questionIndex=0
      this.questionMaxIndex= this.questions.length
    }
  }

    escolheu(value:string){
      this.resposta.push(value)
      this.nextStep()
      console.log(this.resposta)
    }

    async nextStep(){
      this.questionIndex+=1
      if(this.questionMaxIndex > this.questionIndex){
         this.questionSelected = this.questions[this.questionIndex]

      }else{
        const final :string= await this.checkResultado(this.resposta)
        this.finished=true
        this.respostaSelecionada = quizz_questions.results[final as keyof
         typeof quizz_questions.results]
    }
  }

async checkResultado(resp:string[]){

  const result = resp.reduce((previous, current, i , arr)=>{
    if(
  arr.filter(item => item == previous).length>
  arr.filter(item=> item == current).length
    ){
      return previous
    }else{
      return current
    }
   })
   return result
 }

}
