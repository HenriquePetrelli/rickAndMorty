import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showLoading: boolean = false;

  constructor() {}

  async ngOnInit(): Promise<void> {
    const { id, version } = await document.interestCohort();
  }

  
}
