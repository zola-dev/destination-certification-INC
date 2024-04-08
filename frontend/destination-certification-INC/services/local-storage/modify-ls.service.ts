import { Inject, Injectable } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import swal from 'sweetalert2';
import { WeLoveLazyService } from '../we-love-lazy.service';
@Injectable({
  providedIn: 'root'
})
export class ModifyLSService {
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
    let tempArr=this.state.getLS("tempArr");
    if(tempArr){
     this.localStorage(data,resAPi,false);
     data.array={tempArr:tempArr};
     this.localStorage(data,resAPi,true);
    }else{
      this.localStorage(data,resAPi,true);
    }
  }
  async localStorage(data,resAPi,swallMessage){
    let arrayName=Object.keys(data.array)[0];
    let array=[...data.array[arrayName]];
    let updateName = Object.keys(data.item)[1]; 
 
    for (var i=0;i<array.length;i++){
      if(array[i].id==data.item.id){
        if(data.item[updateName]!=undefined){
          array[i][updateName]=data.item[updateName];
          this.state.saveData(arrayName,array);
          var el=JSON.stringify(array[i]);
        }else{
          el=JSON.stringify(array[i]);
          array.splice(i, 1);
          this.state.saveData(arrayName,array);   
        }
        if(swallMessage){
        let resLS=`${i}:\n${el}${data.item[updateName]?' = ':' '}${data.item[updateName]!=undefined?data.item[updateName]:'deleted'}`
        console.log(resLS);
        (await this.weLoveLazy.swallMessagesService).execute(resLS,resAPi);
        }
          break;
      }
     } 
  }
}
