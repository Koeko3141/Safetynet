import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { alerts } from '../Model/AlertDatabase';
import { RouterLink } from '@angular/router';

declare var M: any; // Materialize-Framework

@Component({
  selector: 'app-help-site',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './help-site.component.html',
  styleUrl: './help-site.component.css'
})
export class HelpSiteComponent {
  nameOption: string = 'no';
  name: string = '';

  @ViewChild('modal1') modalElement!: ElementRef;

  // Static data for testing
  wordBase = [
    { word: "bombe", weigting: 0.8 },
    { word: "isis", weigting: 0.9 },
    { word: "töten", weigting: 0.75 },
    { word: "schule", weigting: 0.7 },
    { word: "freund", weigting: 0.55 },
    { word: "nett", weigting: 0.3 }
  ];

  ngAfterViewInit() {
    if (typeof M !== 'undefined') {
      M.Modal.init(this.modalElement.nativeElement);
    }
  }

  onSubmit(form: NgForm) {
    let singleWords = form.value.description.split(" ");
    let priority = 0;
    let found = false;
    let foundIndex = 0;

    for (let sentenceIndex in singleWords) {
      for (let wordBaseIndex in this.wordBase) {
        if (singleWords[sentenceIndex].toLowerCase() === this.wordBase[wordBaseIndex].word) {
          found = true;
          foundIndex = Number(wordBaseIndex);
          break;
        } else {
          found = false;
        }
      }

      if (found) {
        if (priority === 0) {
          priority = this.wordBase[foundIndex].weigting;
        } else {
          priority = priority * this.wordBase[foundIndex].weigting;
        }
      } else {
        priority = priority * 1;
      }
    }

    alerts.push({
      subject: form.value.subject,
      name: form.value.name,
      description: form.value.description,
      priority: priority
    });

    alerts.sort((a, b) => b.priority - a.priority);

    console.log(alerts);

    // open modal upon sending form
    const modalInstance = M.Modal.getInstance(this.modalElement.nativeElement);
    modalInstance.open();

    // reset form
    form.resetForm();
    this.nameOption = 'no';
  }
}
