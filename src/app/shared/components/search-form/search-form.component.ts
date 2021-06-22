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
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  characterName: string;
  showCharacter: boolean;
  characters: NgIterable<Character> | null | undefined;
  showCharacterDetails: boolean = false;
  showPagination: boolean = false;
  count: string | null | undefined;
  next: string | null | undefined;
  prev: string | null | undefined;
  pages: number | undefined;
  numbers: number[] = [];

  constructor(
    private router: Router,
    private _characterService: CharacterService,
    private _helper: Helper,
    private homeComponent: HomeComponent
  ) {
    this.characterName = '';
    this.showCharacter = true;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  async searchCharacter(isFirstPage: boolean) {
    let isValid = this.validateForm();
    if (!isValid) return;

    this.homeComponent.showLoading = true;
    let lastPage;
    if (!isFirstPage) {
      lastPage = localStorage.getItem('next_page');
    } else {
      lastPage = '1';
    }
    if (!lastPage) lastPage = '1';

    (
      await this._characterService.searchCharactersByName(
        this.characterName,
        lastPage
      )
    )
      .toPromise()
      .then(async (response: any) => {
        if (!response) {
          this.homeComponent.showLoading = false;
          this._helper.showToastMsg('Character not found!', '', 4000);
          return;
        }
        localStorage.setItem('character_name', this.characterName);
        localStorage.setItem('character_name', this.characterName);
        this.characters = response.results;
        await this.setPagination(response.info);
        this.showCharacter = true;
        this.homeComponent.showLoading = false;
        if (this.pages) {
          this.numbers = [];
          for (let index = 1; index <= this.pages; index++) {
            this.numbers.push(index);
          }
        }
        console.log(this.numbers);
        this.showPagination = true;
      })
      .catch((error) => {
        this.homeComponent.showLoading = false;
        let msgError = this._helper.returnMsgToRequest(error);
        this._helper.showToastMsg('Character not found!', '', 4000);
      });
  }

  async setPagination(info: {
    count: number;
    next: string;
    prev: string;
    pages: number | undefined;
  }) {
    this.count = info.count.toString();
    this.next = info.next;
    this.prev = info.prev;
    this.pages = info.pages;
  }

  validateForm() {
    if (!this.characterName) {
      this._helper.showToastMsg(
        'Fill in the field to complete the search!',
        '',
        4000
      );
      return false;
    } else if (this.characterName.length < 3) {
      this._helper.showToastMsg(
        'Fill in the field with at least 3 letters!',
        '',
        4000
      );
      return false;
    } else return true;
  }

  openCharacterDetail(id: number) {
    this.showCharacterDetails = true;
    this._characterService.setIdCharacter(id);
  }

  changePage(isNext: boolean) {
    let pageNumber = '';
    if (isNext && this.next) {
      pageNumber = this._helper.returnSplitPaginationUrlApi(this.next);
    } else if (!isNext && this.prev) {
      pageNumber = this._helper.returnSplitPaginationUrlApi(this.prev);
    }
    localStorage.setItem('next_page', pageNumber);
    this.searchCharacter(false);
  }

  goToPage(i: number) {
    localStorage.setItem('next_page', i.toString());
    this.searchCharacter(false);
  }

  scroll = (event: any): void => {
    let elementForm = document.getElementById('form');
    let elementFormBtn = document.getElementById('form-btn');
    let elementToolbar = document.getElementById('toolbar');
    let elementLogo = document.getElementById('logo');

    let body = document.getElementById('main');
    if (
      body &&
      elementForm &&
      elementFormBtn &&
      elementToolbar &&
      elementLogo
    ) {
      if (body.scrollTop > 80 && event.target.clientWidth > 400) {
        this.showToolbar(
          elementForm,
          elementFormBtn,
          elementToolbar,
          elementLogo
        );
      } else if (body.scrollTop < 80 && event.target.clientWidth > 400) {
        this.hideToolbar(
          elementForm,
          elementFormBtn,
          elementToolbar,
          elementLogo
        );
      }
    }
  };

  showToolbar(
    elementForm: HTMLElement,
    elementFormBtn: HTMLElement,
    elementToolbar: HTMLElement,
    elementLogo: HTMLElement
  ) {
    elementForm.style.top = '15px';
    elementForm.style.position = 'fixed';
    elementForm.style.zIndex = '3';
    elementFormBtn.style.top = '15px';
    elementFormBtn.style.zIndex = '3';
    elementFormBtn.style.position = 'fixed';
    elementToolbar.style.display = 'block';
    elementLogo.style.top = '-10px';
    elementLogo.style.position = 'fixed';
    elementLogo.style.width = '250px';
    elementLogo.style.height = '80px';
    elementLogo.style.left = '50px';
  }

  hideToolbar(
    elementForm: HTMLElement,
    elementFormBtn: HTMLElement,
    elementToolbar: HTMLElement,
    elementLogo: HTMLElement
  ) {
    elementForm.style.top = '326px';
    elementForm.style.position = 'absolute';
    elementFormBtn.style.top = '326px';
    elementFormBtn.style.position = 'absolute';
    elementToolbar.style.display = 'none';
    elementLogo.style.top = '38px';
    elementLogo.style.position = 'absolute';
    elementLogo.style.width = '502px';
    elementLogo.style.height = '214px';
    elementLogo.style.left = 'calc(50% - 502px / 2 + 12px)';
  }
}
