import { Component, OnInit, Inject } from '@angular/core';
import imgData from '../assets/imgs.json';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';
import { DialogData } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'ng_test';
  isMobileLayout = false;
  finished = false;
  counter = 0;
  score = 0;
  mode = 0;
  pointsInRound = 0;
  buttonText = "Submit";
  showAnswers = false;
  correctAnswers:string[] = [];
  wrongAnswers:string[] = [];
  missedAnswers:string[] = [];

  constructor(breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
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

  public onSubmit() {

    if(!this.showAnswers) {
      let userInput = (<HTMLInputElement>document.getElementById("prompt_in")).value;
      // make tag array by slit and add unique
      let currentPromptTags = Array.from(new Set(this.imgList[this.counter].prompt.split(/[\s,]+/)));

      if(userInput.includes(",") || userInput.includes(" ")) {
        Array.from(new Set(userInput.split(/[\s,]+/))).forEach(value => {
          this.checkInput(value, currentPromptTags);
        });
      } else {
        console.log("single input");
        this.checkInput(userInput, currentPromptTags);
      }
      for(let tag of currentPromptTags) {
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
        this.finished = true;
        this.openFinishedDialog();
      }
    }
  };

  ngOnInit(): void {
    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;

    this.imgList = this.imgList.sort(() => Math.random() - 0.5);

    // for(let img of this.imgList) {
    //   let array = Array.from(new Set(img.prompt.split(/[\s,]+/)));
    //   this.GameData.push({src: img.src, prompt_tags: array});
    // }
    // this.GameData = this.GameData.sort(() => Math.random() - 0.5);
  };

  checkInput(input:string, checkAgainst:string[]) {
    let correct = false;
    let userInput = input.trim().toLowerCase();
    for(let tag of checkAgainst) {
    //for(let tag of this.GameData[this.counter].prompt_tags) {
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

  openFinishedDialog() {
    const dialogRef = this.dialog.open(FinishDialogComponent, {
      data: {
        score: this.score,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
