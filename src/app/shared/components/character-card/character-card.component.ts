import { Component, OnInit } from '@angular/core';
import { httpError } from '../../models/httpError';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  constructor( private _characterService: CharacterService, private _httpError: httpError) { }

  ngOnInit(): void {
  }

  async searchCharacters(character: string) {
   let characters = this._characterService.searchCharacters(character);
   console.log(characters);
  }

}
