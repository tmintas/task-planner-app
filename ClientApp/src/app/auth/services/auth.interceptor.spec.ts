import { TestBed, getTestBed, fakeAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from 'app/to-dos/services/todo.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import AppState from '@states/app';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';

describe('AuthInterceptor', () => {
    const apiUrl = '/api/Todo';
    let todoService: TodoService;
    let httpMock: HttpTestingController;
    let storeMock: MockStore<AppState>;
    const initialState = { auth: { currentUser : new User('testName', '12345') } };

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
                provideMockStore({ initialState })
            ]
        });

        storeMock = TestBed.get(Store);
        todoService = TestBed.get(TodoService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should add a correct Authorization header', () => {
        todoService.GetUserTodos().subscribe(res => expect(res).toBeTruthy());

        const httpRequest = httpMock.expectOne(apiUrl);

        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
        expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${initialState.auth.currentUser.AccessToken}`);
    });
})
