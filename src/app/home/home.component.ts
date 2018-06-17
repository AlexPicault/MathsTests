import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OpService } from "../../services/operations";
import { GridService } from "../../services/grid";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  constructor(
    private OpService: OpService,
    private GridService: GridService,
  ) { }


  currentOp: any = {};
  wrong: number = 0;
  wrongTry: number = 0;
  correct: number = 0;
  try: number = 0;
  steps: any = [];
  operation: string = "multiplication";
  level: number = 2;
  grid: any = [];
  answer: number = 0;

  ngOnInit() {
    this.steps = this.GridService.setSteps();
    this.grid = this.GridService.setGrid();
    this.currentOp = this.OpService.getOp(this.operation, this.level);
  }

  //set answer parameters (squareColor, step, try)
  setAnswer(answer) {
    this.answer = answer.value;
    if (this.answer === this.currentOp.result) {
      this.setSquareColor(answer, true);
      this.correct++;
      this.steps[this.try] = "ok";
      this.currentOp = this.OpService.getOp(this.operation, this.level);
      this.grid = this.GridService.setGrid();
      this.reSetSteps("ok");
    } else {
      this.wrongTry++
      this.wrong++;
      this.setSquareColor(answer, false);
      if (this.wrongTry === 2) {
        this.helpme();
        this.wrongTry = 0;
      }
      this.steps[this.try] = "ko";
      this.reSetSteps("ko");
    }
  }

  //reset step bar
  reSetSteps(status) {
    this.try++;
    if (this.try === 21) {
      this.try = 0;
      this.steps = this.GridService.setSteps();
      this.steps[this.try] = status;
    }
  }

  //set square color if wrong or correct answer 
  setSquareColor(answer, answerStatus) {
    if (answer.value < 10) {
      this.grid[0][answer.value].color = (answerStatus) ? "ok" : "ko"
    } else {
      var digits = answer.value.toString().split('');
      this.grid[digits[0]][digits[1]].color = (answerStatus) ? "ok" : "ko";
    }
  }

  //change color of square into grey to help when 2 consecutives wrong
  helpme() {
    for (var i = 0; i < 100; i++) {
      switch (this.currentOp.op) {
        case 'multiplication':
          if (i % this.currentOp.digit1 != 0) {
            this.setHelpSquares(i);
          }
          break;

        case 'addition':
        case 'soustraction':
          if (i != this.currentOp.result && Math.random() > 0.7) {
            this.setHelpSquares(i);
          }
        default:
      }
    }
  }

  //change color of square into grey
  setHelpSquares(i) {
    if (i < 10) {
      this.grid[0][i].help = "wrong"
    } else {
      var digits = i.toString().split('');
      this.grid[digits[0]][digits[1]].help = "wrong";
    }
  }

  //set new operation and clear grid
  setOperation(param) {
    if (typeof param === 'number') {
      this.level = param
    } else {
      this.operation = param;
    }
    this.currentOp = this.OpService.getOp(this.operation, this.level);
    this.grid = this.GridService.setGrid();
  }
}
