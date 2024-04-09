import { Inject, Injectable } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import swal from 'sweetalert2';
import { WeLoveLazyService } from '../we-love-lazy.service';
@Injectable({
  providedIn: 'root'
})
export class UpdateToDoLSService {
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
    let array=data.array[arrayName];  
    let updateName=Object.keys(array[0])[2];

    for (var i=0;i<array.length;i++){
      if(array[i].id==data.item.id){
        array[i].completed=data.item.update;
        this.state.saveData(arrayName,array);
        let resLS=`${arrayName}[${i}].id=${array[i].id}, ${arrayName}[${i}].completed updated to ${data.item.update}`
        console.log(resLS);
        (await this.weLoveLazy.swallMessagesService).execute(resLS,resAPi);
          break;
      }
     } 
  }
}
