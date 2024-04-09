// import { TestBed } from '@angular/core/testing';
// import { ApiService } from './api.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { nextApis } from '../global-constants/requestUrls'

// describe('ApiService', () => {
//   let service: ApiService;
//   let httpMock: HttpTestingController;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ApiService]
//     });
//   });
//   service = TestBed.inject(ApiService);
//   httpMock = TestBed.inject(HttpTestingController);
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should send login request with correct data and headers', () => {
//     const userData = { username: 'testuser', password: 'testpassword' };
//     const expectedUrl = nextApis.login;
//     const expectedResponse = { token: 'mocked-token' };
//     service.login(userData).subscribe(response => {
//     expect(response).toEqual(expectedResponse);
//     });
//     const req = httpMock.expectOne(expectedUrl);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual(userData);
//     console.log("userData: ", req.request.body);
//     expect(req.request.headers.get('Content-Type')).toBe('application/json');
//     req.flush(expectedResponse);
//   });

//   it('should send addToDo request with correct data and headers', () => {
//     const todoData = { title: 'Test Todo', description: 'Test Description' };
//     const expectedUrl = nextApis.addToDo;
//     const expectedResponse = { id: 'mocked-id', ...todoData };
//     service.addToDo(todoData).subscribe(response => {
//     expect(response).toEqual(expectedResponse);
//     });
//     const req = httpMock.expectOne(expectedUrl);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual(todoData);
//     expect(req.request.headers.get('Content-Type')).toBe('application/json');
//     req.flush(expectedResponse);
//   });

//   it('should send updateToDo request with correct data and headers', () => {
//     const todoUpdateData = { id: 'mocked-id', title: 'Updated Title', completed: true };
//     const expectedUrl = nextApis.updateToDo;
//     const expectedResponse = { success: true };
  
//     service.updateToDo(todoUpdateData).subscribe(response => {
//       expect(response).toEqual(expectedResponse);
//     });
//     const req = httpMock.expectOne(expectedUrl);
//     expect(req.request.method).toBe('PATCH');
//     expect(req.request.body).toEqual(todoUpdateData);
//     expect(req.request.headers.get('Content-Type')).toBe('application/json');
//     req.flush(expectedResponse);
//   });

//   it('should send deleteToDo request with correct data and headers', () => {
//     const todoId = 'mocked-id';
//     const expectedUrl = `${nextApis.deleteToDo}/${todoId}`;
//     const expectedResponse = { success: true };
//     service.deleteToDo(todoId).subscribe(response => {
//       expect(response).toEqual(expectedResponse);
//     });
//     const req = httpMock.expectOne(expectedUrl);
//     expect(req.request.method).toBe('DELETE');
//     expect(req.request.body).toEqual({ id: todoId });
//     expect(req.request.headers.get('Content-Type')).toBe('application/json');
//     req.flush(expectedResponse);
//   });
  
// });
