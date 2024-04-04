import { Inject, Injectable } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import swal from 'sweetalert2';
import { WeLoveLazyService } from '../we-love-lazy.service';

@Injectable({
  providedIn: 'root'
})
export class AddToDoLSService {
  public message = swal.mixin({
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    timer: 10000,
    color: '#28529f',
    background: '#f9f9f9',
    confirmButtonColor: '#28529f',
    denyButtonColor:'#ff5d5d'
  });
  constructor(
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
    private weLoveLazy:WeLoveLazyService,
  ) { }
  async execute(data,resAPi){
    let arrayName=Object.keys(data.array)[0];
    let array=[...data.array[arrayName]];
    if(!array){
      array=new Array();
    }
    array.push(data.item);//reuseable for unshift
    this.state.saveData(arrayName,array);
    let resLS =array.length-1+":\n"+JSON.stringify(data.item);
    console.log("item: ",resLS,` stored in local storage`);
    (await this.weLoveLazy.swallMessagesService).execute(resLS,resAPi);
  }
}