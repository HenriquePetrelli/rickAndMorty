import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class Helper {
    constructor(
        private _snackBar: MatSnackBar) {
    }

    showToastMsg(msg: string, position: string, duration: number) {
        this._snackBar.open(msg, position, {
            duration,
        });
    }

    returnMsgToRequest(response: any) {
        switch (response.status) {
            case 0: {
                response.message = "Please, check your connection!";
                return response;
            }
            case 200: {
                response.message = response.error;
                return response;
            }

            case 400: {
                response.message = response.error;
                return response;
            }

            case 404: {
                response.message = response.error;
                return response;
            }

            case 500: {
                response.message = response.error;
                return response;
            }

            case 600: {
                response.message = response.error;
                return response;
            }

            default: {
                response.message = response.error;
                return response;
            }
        }
    }
}