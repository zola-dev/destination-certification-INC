import { Inject, Injectable } from '@angular/core';
import { TimerService } from '../timer.service';
import { StateManagementService } from '../state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginLSService {
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
    private timer:TimerService,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
  ) { }
  execute(data){
    this.state.saveData('token',data.token);
    this.state.saveData('users',data.users);
    this.state.saveData('toDo',data.toDo);
    this.timer.startTimer();
    console.log("login data stored in LS");
  }
}
