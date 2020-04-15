import { HttpErrorResponse } from '@angular/common/http';
import { TodoActionTypes } from '@actions/todo';

export class HandledError {
    constructor(error: HttpErrorResponse | ErrorEvent, action : TodoActionTypes) { 
        this.Error = error;
        this.Action = action;
    }

    public Error : HttpErrorResponse | ErrorEvent;
    // extend with other types in future
    public Action : TodoActionTypes;

    public get ErrorTitle() : string {
        switch (this.Action) {
            case TodoActionTypes.LOAD_TODOS_ALL_FAIL:
                return 'There was an error while loading all items';
            case TodoActionTypes.UPDATE_TODO_FAIL:
                return 'There was an error while updating the item';
            case TodoActionTypes.CREATE_TODO_FAIL:
                return 'There was an error while creating the item';
            case TodoActionTypes.DELETE_TODO_FAIL:
                return 'There was an error while deleting the item';
            default:
                return 'There was an error';
        }
    }
}
