import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(private _snackBar: MatSnackBar) {}

  showToastMsg(msg: string, button: string, duration: number) {
    this._snackBar.open(msg, button, {
      duration,
    });
  }

  returnSplitPaginationUrlApi(url: string) {
    let splitUrl = url.split('=');
    var split = splitUrl[1].split('&');
    return split[0];
  }

  returnSplitUrlApi(url: string) {
    let split = url.split('/');
    return split[5];
  }

  returnMsgToRequest(response: any) {
    switch (response.errorNumber) {
      case 0: {
        response.message = 'Please, check your connection!';
        return response;
      }
      case 200: {
        response.message = response.friendlyMessage;
        return response;
      }

      case 400: {
        response.message = response.friendlyMessage;
        return response;
      }

      case 404: {
        response.message = response.friendlyMessage;
        return response;
      }

      case 500: {
        response.message = response.friendlyMessage;
        return response;
      }

      case 600: {
        response.message = response.friendlyMessage;
        return response;
      }

      default: {
        response.message = response.friendlyMessage;
        return response;
      }
    }
  }
}
