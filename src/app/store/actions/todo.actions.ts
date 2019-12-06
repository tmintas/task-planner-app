import { createAction, props } from '@ngrx/store';
import { ToDoItem } from 'app/to-dos/models/to-do-item.model';

// type '[Tdodo] Add', payload of type ToDoItem
export const AddTodo = createAction('[Todo] Add', props<ToDoItem>());

export const GetTodo = createAction('[Todo] Get');