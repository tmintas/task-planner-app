import { createAction, props } from '@ngrx/store';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

export const AddTodo = createAction('[Tdodo] Add', props<{item : ToDoItem}>())
