import { RegisterError } from './register-error.model';

export class RegisterResponse {
    Succeeded? : boolean;
    Errors : RegisterError[]
}