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

  async searchCharacters(characterName: string): Promise<Observable<Character[] | httpError>> {
    const result = `${environment.baseUrl}?name=${characterName}`;
    return await this.http.get<Character[]>(result)
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
