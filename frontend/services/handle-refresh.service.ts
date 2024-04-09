import { Inject, Injectable } from '@angular/core';
import { StateManagementService } from './state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
@Injectable({
  providedIn: 'root'
})
export class HandleRefreshService {
  constructor(
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
  ) { }
  async execute(){
    let tempArr=this.state.getLS("tempArr");
    this.state.saveData('toDo',tempArr);
    this.state.saveData('tempArr',null);
    console.log('refresh handled'); 
  }
}
