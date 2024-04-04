import { Inject, Injectable } from '@angular/core';
import { StateManagementService } from './state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CloseService {

  constructor(
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
    private router:Router
  ) { }
  execute(){
    this.state.removeData('token');
    this.state.removeData('tokenTimer');
    this.state.removeData('authKey');
    this.state.removeData('toDo');
    this.state.removeData('users');
    let appWrapper=document.getElementById('appWrapper');
    appWrapper.classList.add('hideGlobal');
    setTimeout(async ()=>{
    appWrapper.classList.remove('hideHome');
    appWrapper.classList.replace('hideGlobal','globalShow');
    this.router.navigate(['/login'])
    }, 500);
  }
}
