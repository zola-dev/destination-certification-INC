import { Injectable } from '@angular/core';
import { WeLoveLazyService } from './we-love-lazy.service';

@Injectable({
  providedIn: 'root'
})
export class QueryAuthService {
  constructor(
    private weLoveLazy:WeLoveLazyService, 
  ) { }
  async execute(){
    var authKey=localStorage.getItem("authKey");
    if(authKey){
      (await this.weLoveLazy.login).execute({authKey:authKey});
    }
  }
}
