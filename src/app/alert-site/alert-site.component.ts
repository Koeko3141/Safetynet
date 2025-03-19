import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { alerts } from '../Model/AlertDatabase';

@Component({
  selector: 'app-alert-site',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alert-site.component.html',
  styleUrl: './alert-site.component.css'
})

export class AlertSiteComponent implements OnInit {
  data = alerts

  ngOnInit(): void {
    alerts.sort((a, b) => b.priority - a.priority)
  }
}