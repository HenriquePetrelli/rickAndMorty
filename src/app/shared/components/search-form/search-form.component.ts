import { Component, NgIterable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import { CharacterService } from '../../services/character.service';
// import { CharacterCardComponent } from '../character-card/character-card.component';

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
    private _characterService: CharacterService
    ) {
      this.characterName = "";
    this.showCharacter = true;
  }

  ngOnInit(): void {}

  

  async searchCharacter() {
    let response = (await this._characterService.searchCharactersByName(this.characterName)).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.characters = response.results;
        this.showCharacter = true;
        response.results.forEach((result: { status: string; }) => {
          console.log(result.status);
        });
      }
    }, error => {
      // let msgError = this._helper.returnMsgToRequest(error);
      // this._helper.showToastMsg(msgError.error, "", 6000);
    });
  }

  // async getCharacterDetails(id: any) {
  //   if (id) {
  //     let response = (await this._characterService.getCharacterDetailsById(id)).subscribe((response: any) => {
  //       if (response) {
  //        console.log(response);
  //       }
  //     }, error => {
  //       // let msgError = this._helper.returnMsgToRequest(error);
  //       // this._helper.showToastMsg(msgError.error, "", 6000);
  //     });
  //     // let msgError = this._helper.returnMsgToRequest(error);
  //     // this._helper.showToastMsg(msgError.error, "", 6000);
  //   }
  // }
  
}
