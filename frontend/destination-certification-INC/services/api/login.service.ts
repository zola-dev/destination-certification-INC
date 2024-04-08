import { Injectable } from '@angular/core';
import { WeLoveLazyService } from '../we-love-lazy.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  constructor(
    private weLoveLazy:WeLoveLazyService,
    private ngxService : NgxUiLoaderService
  ) { }
  async execute(data) {
       this.ngxService.start();
       (await this.weLoveLazy.ApiService).login(data).subscribe({
        next: async (response: any) => {
        this.ngxService.stop();
        (await this.weLoveLazy.loginLSService).execute(response);
        this.ngxService.stop();
        console.log("login response (API): \n",response);
        (await this.weLoveLazy.swallMessagesService).execute(null,response.message);
      },
        error: (error: any) => {
        console.error(error);
      }
    })
  }
}
