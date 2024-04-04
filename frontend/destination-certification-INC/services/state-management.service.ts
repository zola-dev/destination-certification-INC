import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { ToDo, Users, TokenTimer } from '../interfaces/index';
@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  public authKeyUpdate:BehaviorSubject<string|null>=new BehaviorSubject<string|null>(null);
  authKeyCast$ = this.authKeyUpdate.asObservable().pipe(shareReplay(1));
  public authKey:string|null=null;

  public tokenUpdate:BehaviorSubject<string|null>=new BehaviorSubject<string|null>(null);
  tokenCast$ = this.tokenUpdate.asObservable().pipe(shareReplay(1));
  public token:string|null=null;

  public tokenTimerUpdate:BehaviorSubject<TokenTimer|null>=new BehaviorSubject<TokenTimer|null>(null);
  tokenTimerCast$ = this.tokenTimerUpdate.asObservable().pipe(shareReplay(1));
  public tokenTimer:TokenTimer|null=null;

  public toDoUpdate:BehaviorSubject<ToDo[]|null>=new BehaviorSubject<ToDo[]|null>(null);
  toDoCast$ = this.toDoUpdate.asObservable().pipe(shareReplay(1));
  public toDo:ToDo[]|null=null;

  public tempArrUpdate:BehaviorSubject<any[]|null>=new BehaviorSubject<any[]|null>(null);
  tempArrCast$ = this.tempArrUpdate.asObservable().pipe(shareReplay(1));
  public tempArr:any[]|null=null;

  public usersUpdate:BehaviorSubject<Users[]|null>=new BehaviorSubject<Users[]|null>(null);
  usersCast$ = this.usersUpdate.asObservable().pipe(shareReplay(1));
  public users:Users[]|null=null;

  public appStateUpdate:BehaviorSubject<any|null>=new BehaviorSubject<any|null>(null);
  appStateCast$ = this.appStateUpdate.asObservable().pipe(shareReplay(1));
  public appState:any|null=null;

public getLS(key){
    if(key!=='token'&&key!='authKey'){
      if(this[key]){
        console.log(key,`cached: `,this[key]);
        return this[key];
      }else{
        return (this.getData(key));
      }
    }else{
        if(this[key]){
          return this[key];
        }else{
          var token = localStorage.getItem(key);
          this.update(key,token);
          this[key+'Cast$'].subscribe(x => this[key] = x);
          console.log(key,` set: `,this[key]);
          return this[key];
        } 
    }
}
public getData(key: string):any {
  var data=localStorage.getItem(key);
  this.update(key,JSON.parse(data));
  this[key+'Cast$'].subscribe(x => this[key] = x);
  console.log(key,` set: `,this[key]);
  return JSON.parse(data);
}
public saveData(key: string, value: any) {
    this.update(key,value);
  if(key!=='token'){
    value=JSON.stringify(value);
  }
  // console.log(key,` stored`);
  localStorage.setItem(key,value);
}
public removeData(key: string) {
  localStorage.removeItem(key);
  this.update(key,null);
}
update(key: string, value: any){
  this[key+'Update'].next(value);
}
}
