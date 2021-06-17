import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  characterName: string | undefined;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  searchCharacter() { 
    if (this.characterName) {
      let character = this.characterService.searchCharacters(this.characterName);
      console.log(character);
    }

  }
}
