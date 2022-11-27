import { Component, OnInit } from '@angular/core';
import imgData from '../assets/imgs.json';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'ng_test';
  isMobileLayout = false;
  counter = 0;
  score = 0;
  mode = 0;
  pointsInRound = 0;
  buttonText = "Submit";
  showAnswers = false;
  correctAnswers:string[] = [];
  wrongAnswers:string[] = [];
  missedAnswers:string[] = [];

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            console.log(query);
          }
        }
      });
    }

  public imgList:{src:string, prompt:string}[] = imgData;
  public GameData: { src: string; prompt_tags: string[]; }[] = [];

  public getImgData() {
      return { source: this.GameData[this.counter].src, tags: this.GameData[this.counter].prompt_tags };
  };

  public onSubmit() {
    if(!this.showAnswers) {
      let userInput = (<HTMLInputElement>document.getElementById("prompt_in")).value;
      
      if(userInput.includes(",") || userInput.includes(" ")) {
        Array.from(new Set(userInput.split(/[\s,]+/))).forEach(value => {
          this.checkInput(value);
        });
      } else {
        console.log("single input");
        this.checkInput(userInput);
      }
      for(let tag of this.GameData[this.counter].prompt_tags) {
        if(!this.correctAnswers.includes(tag))
          this.missedAnswers.push(tag);
      };
      this.pointsInRound = this.correctAnswers.length * 5 - this.wrongAnswers.length;
      this.score += this.pointsInRound;
      this.buttonText = "Next Image";
      this.showAnswers = true;
      //this.counter += 1;
    } else {
      if(this.counter < this.imgList.length - 1) {
      this.counter += 1;
      this.wrongAnswers = [];
      this.correctAnswers = [];
      this.missedAnswers = [];
      this.pointsInRound = 0;
      this.buttonText = "Submit";

      (<HTMLInputElement>document.getElementById("prompt_in")).value = '';

      this.showAnswers = false;
      } else {
        // finished all images
      }
    }
  };

  ngOnInit(): void {
    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;

    for(let img of this.imgList) {
      let array = Array.from(new Set(img.prompt.split(/[\s,]+/)));
      this.GameData.push({src: img.src, prompt_tags: array});
    }
  };

  checkInput(input:string) {
    let correct = false;
    let userInput = input.trim().toLowerCase();
    for(let tag of this.GameData[this.counter].prompt_tags) {
      let tagString = tag.trim().toLowerCase();
      console.log(tag);
      if(userInput === tagString) { 
        correct = true; 
      }
    };
    if(!correct) {
        this.wrongAnswers.push(userInput);      
    } else {      
        this.correctAnswers.push(userInput);     
    }
    console.log("correct: "+correct+" input: "+userInput);
    return correct;
  }
}

