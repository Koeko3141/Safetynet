import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare var M: any; // Materialize-Framework

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof M !== 'undefined') {
      setTimeout(() => {
        const elems = document.querySelectorAll('.sidenav');
        const instances = M.Sidenav.init(elems, { edge: 'left' });

        // close sidenav when navigating to screens in mobile view
        document.querySelectorAll('.sidenav a').forEach(link => {
          link.addEventListener('click', () => {
            const sidenavInstance = M.Sidenav.getInstance(elems[0]);
            sidenavInstance.close();
          });
        });

      }, 300);
    }
  }
}
