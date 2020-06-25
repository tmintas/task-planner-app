import { SignUpSuccess, AuthActionTypes } from "@actions/auth";
describe('Sign Up Success', () => {
    it('should create an action', () => {
 
        const action = SignUpSuccess();

        expect({ ...action }).toEqual({
            type: AuthActionTypes.SIGN_UP_SUCCESS,
        });
    });
});