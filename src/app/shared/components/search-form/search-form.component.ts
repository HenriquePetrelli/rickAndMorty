import { Component, NgIterable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Helper } from 'src/app/utils/helper';
import { Character } from '../../interfaces/character.interface';
import { CharacterService } from '../../services/character.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  characterName: string;
  showCharacter: boolean;
  characters: NgIterable<Character> | null | undefined;
  showCharacterDetails: boolean = false;

  constructor(private router: Router,
    private _characterService: CharacterService,
    private _helper: Helper,
    private homeComponent: HomeComponent
  ) {
    this.characterName = "";
    this.showCharacter = true;
  }

  ngOnInit(): void { }

  async searchCharacter() {
    let isValid = this.validateForm();
    if (!isValid) return;
    this.homeComponent.showLoading = true;
    (await this._characterService.searchCharactersByName(this.characterName)).toPromise().then((response: any) => {
      if (!response) {
        this.homeComponent.showLoading = false;
        this._helper.showToastMsg("Character not found!", "", 4000);
        return;
      }
      this.characters = response.results;
      console.log(this.characters);
      this.showCharacter = true;
      this.homeComponent.showLoading = false;
    }).catch(error => {
      this.homeComponent.showLoading = false;
      let msgError = this._helper.returnMsgToRequest(error);
      this._helper.showToastMsg(msgError.message, "", 4000);
    })
  }

  validateForm() {
    if (!this.characterName) {
      this._helper.showToastMsg("Fill in the field to complete the search!", "", 4000);
      return false;
    }
    else if (this.characterName.length < 3) {
      this._helper.showToastMsg("Fill in the field with at least 3 letters!", "", 4000);
      return false;
    } else return true;
  }

  openCharacterDetail(id: number) {
    this.showCharacterDetails = true
    this._characterService.setIdCharacter(id);
  }
}
