import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from 'app/to-dos/services/todo.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { AUTH_INITIAL_STATE } from "@states/auth";

describe('### AuthInterceptor ###', () => {
    const apiUrl = '/api/Todo/user-todos';
    let todoService: TodoService;
    let httpMock: HttpTestingController;
    let storeMock: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AuthInterceptor,
                TodoService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass : AuthInterceptor,
                    multi : true
                },
                provideMockStore()
            ]
        });

        storeMock = TestBed.inject(Store);
        todoService = TestBed.inject(TodoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('user is logged in - should set an Authorization header to request to contain the access token of current user', () => {
    	// arrange
		const accessToken = '12345';
		storeMock.setState({ 
			auth : { 
				...AUTH_INITIAL_STATE, 
				currentUser : new User('testName', accessToken) 
			}
		});
		
		// act
		todoService.GetUserTodos().subscribe();

        // assert
        const httpRequest = httpMock.expectOne(apiUrl);
        expect(httpRequest.request.headers.has('Authorization'))
			.toBe(true, 'request headers did not contain an Authorization header');
        expect(httpRequest.request.headers.get('Authorization'))
			.toBe(`Bearer ${accessToken}`, 'the authorization header in request was not equal to current user\'s access token');
    });

	it('user is not logged in - should not add an authorization header to the http request', () => {
		// arrange
		storeMock.setState({
			auth : {
				...AUTH_INITIAL_STATE,
			}
		});

		// act
		todoService.GetUserTodos().subscribe();

		// assert
		const httpRequest = httpMock.expectOne(apiUrl);
		expect(httpRequest.request.headers.has('Authorization'))
			.toBe(false, 'request headers contained an Authorization header');
	});
})
