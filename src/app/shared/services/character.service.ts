import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Character } from '../interfaces/character.interface';
import { Helper } from 'src/app/utils/helper';
import { httpError } from '../models/httpError';
import { CharacterDetail } from '../interfaces/character-detail.interface';

@Injectable({
  providedIn: 'root',

})

export class CharacterService {
  constructor(private _helper: Helper, private http: HttpClient) { }

  async searchCharactersByName(characterName: string): Promise<Observable<Character[] | httpError>> {
    const result = `${environment.baseUrl}character/?name=${characterName}`;
    const request = await this.http.get<Character[]>(result)
      .pipe(catchError((err) => this.handleHttpError(err)));
return request;
    }

  async getCharacterDetailsById(id: string) {
    const request = this.http.get<CharacterDetail>(`${environment.baseUrl}/character/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
return request;
  }

  async getLastEpisode(epNumber: number) {
    const request = this.http.get<{}>(`${environment.baseUrl}/episode/${epNumber}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
return request;
  }

  async getCharacterLocationById(id: number | undefined) {
    const request = this.http.get<Location>(`${environment.baseUrl}/location/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
return request;
  }

  setIdCharacter(id: number) {
    localStorage.setItem("id", id.toString())
  }
  
  private handleHttpError(error: HttpErrorResponse): Observable<httpError> {
    let dataError = new httpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retrienving data.';
    return throwError(dataError);
  }
}
