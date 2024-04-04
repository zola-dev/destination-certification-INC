import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.nextApiUrl;
  constructor(
    private httpClient: HttpClient,

  ) { }
  login(data: any) {
    return this.httpClient.post(this.url+"/api/login",data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
  addToDo(data: any) {
    return this.httpClient.post(this.url+"/api/addToDo",data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
  getToDo() {
    return this.httpClient.get(this.url+"/api/addToDo");
  }
  updateToDo(data: any) {
    return this.httpClient.patch(this.url+"/api/updateToDo",data,{
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
  deleteToDo(data){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer my-token',
      }),
      body: {   
        data: data
      },
    };
      console.log(data)
      return this.httpClient.delete(this.url + "/api/deleteToDo",options
  )}
}
