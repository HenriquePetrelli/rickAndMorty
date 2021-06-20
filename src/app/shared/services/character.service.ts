import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';
import { Character } from '../interfaces/character.interface';
import { Helper } from 'src/app/utils/helper';
import { httpError } from '../models/httpError';

@Injectable({
  providedIn: 'root',

})

export class CharacterService {
  constructor(private _helper: Helper, private http: HttpClient) { }

  async searchCharactersByName(characterName: string): Promise<Observable<Character[] | httpError>> {
    const result = `${environment.baseUrl}character/?name=${characterName}`;
    return await this.http.get<Character[]>(result)
      .pipe(catchError((err) => this.handleHttpError(err)));
  }

  async getCharacterDetailsById(id: number) {
    return this.http.get<Character>(`${environment.baseUrl}/character/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  async getLastEpisode(epNumber: number) {
    return this.http.get<Character>(`${environment.baseUrl}/episode/${epNumber}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  async getCharacterLocationById(id: number | undefined) {
    return this.http.get<Character>(`${environment.baseUrl}/location/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }


  
  private handleHttpError(error: HttpErrorResponse): Observable<httpError> {
    let dataError = new httpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retrienving data.';
    return throwError(dataError);
  }
}
