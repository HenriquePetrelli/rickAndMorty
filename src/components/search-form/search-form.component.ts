import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  characterName = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.characterName.hasError('required')) {
      return 'You must enter the name of character';
    }

    return this.characterName.hasError('characterName') ? 'Not a valid email' : '';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
