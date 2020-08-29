import { RegisterError } from '@auth-models';

export class RegisterResponse {
    Succeeded? : boolean;
    Errors : RegisterError[]
}