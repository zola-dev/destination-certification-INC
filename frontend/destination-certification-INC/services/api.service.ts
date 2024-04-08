import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nextApis } from '../global-constants/requestUrls'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,

  ) { }
  login(data: any) {
    return this.httpClient.post(nextApis.login,data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
  addToDo(data: any) {
    return this.httpClient.post(nextApis.addToDo,data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
  updateToDo(data: any) {
    return this.httpClient.patch(nextApis.updateToDo,data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
  deleteToDo(id){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {   
        id
      },
    };
      return this.httpClient.delete(nextApis.deleteToDo,options
  )}
}
