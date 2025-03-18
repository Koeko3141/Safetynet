import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-help-site',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './help-site.component.html',
  styleUrl: './help-site.component.css'
})

export class HelpSiteComponent {
  onSubmit(form:NgForm){
      console.log('Form Data: ', form.value)
    }
}
