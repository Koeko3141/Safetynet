import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { alerts } from '../AlertDatabase';

@Component({
  selector: 'app-alert-site',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alert-site.component.html',
  styleUrl: './alert-site.component.css'
})

export class AlertSiteComponent {
  data = alerts
}