import { Inject, Injectable } from '@angular/core';
import { WeLoveLazyService } from './we-love-lazy.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { StateManagementService } from './state-management.service';
@Injectable({
  providedIn: 'root'
})
export class TimerService {
  constructor(
    private weLoveLazy:WeLoveLazyService,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
  ) { }
  public interval:any; 
  public token:any;

  private tokenTimer(token: string) {
    if(this.token){
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (expiry - Math.floor((new Date).getTime()/1000));
    }else{
      clearInterval(this.interval);
    }

  };
  startTimer(){
      this.interval = setInterval(async () => {
      this.token=this.state.getLS('token');
      if(this.token){
        var temmpTimer= this.tokenTimer(this.token);
        var min = (temmpTimer-(temmpTimer%60))/60;
        var sec = temmpTimer%60
        var data =
        {
          min:min,
          sec:sec,
        }
        this.state.saveData('tokenTimer',data);
        if(min<=0&&sec<0){      
          let title='TokenInterceptor';
          let text='Token expired, TokenInterceptor and jwt-authenticate on Next.js ll throw errors!';
          this.terminate(title,text);
        }
       }
    },1000)
  }
  async terminate(title,text){
    clearInterval(this.interval);    
    (await ((this.weLoveLazy).close)).execute();  
    (await this.weLoveLazy.swallMessagesService).tokenInterceptor(title,text);  
  }
}
