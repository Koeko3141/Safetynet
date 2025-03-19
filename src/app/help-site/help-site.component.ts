import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { alerts } from '../Model/AlertDatabase';

@Component({
  selector: 'app-help-site',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './help-site.component.html',
  styleUrl: './help-site.component.css'
})

export class HelpSiteComponent {
  nameOption: string = 'no'; // Standardwert: "Nein" vorausgewählt
  name: string = '';

  wordBase = [
    {
      word: "bomb",
      weigting: 0.8
    },
    {
      word: "isis",
      weigting: 0.9
    },
    {
      word: "kill",
      weigting: 0.75
    },
    {
      word: "school",
      weigting: 0.7
    },
    {
      word: "friend",
      weigting: 0.55
    },
    {
      word: "nice",
      weigting: 0.3
    },
  ]

  onSubmit(form: NgForm) {
    let singleWords = form.value.description.split(" ")
    let priority = 0
    let found = false
    let foundIndex=0

    for (let sentenceIndex in singleWords) {
      for (let wordBaseIndex in this.wordBase) {
        if (singleWords[sentenceIndex].toLowerCase() === this.wordBase[wordBaseIndex].word) {
          found = true
          foundIndex=Number(wordBaseIndex)
          break
        }else{
          found=false
        }
      }

      if(found){
        if(priority===0){
          priority=this.wordBase[foundIndex].weigting
        }else{
          priority=priority*this.wordBase[foundIndex].weigting
        }
      }else{
        priority=priority*0.5
      }
    }
    
    alerts.push({
      subject:form.value.subject,
      name:form.value.name,
      description:form.value.description,
      priority:priority
    })
    alerts.sort((a, b) => b.priority - a.priority)
  }
}
