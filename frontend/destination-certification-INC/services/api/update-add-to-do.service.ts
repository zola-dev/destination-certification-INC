import { Injectable } from '@angular/core';
import { WeLoveLazyService } from '../we-love-lazy.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class UpdateToDoService {
  constructor(
    private weLoveLazy: WeLoveLazyService,
    private ngxService : NgxUiLoaderService
  ) { }
  async execute(data) {
    this.ngxService.start();
    (await this.weLoveLazy.ApiService).updateToDo(data.item).subscribe({
      next: async (response: any) => {
      this.ngxService.stop();
      (await this.weLoveLazy.updateToDoLSService).execute(data,response.message);
      console.log("update response (API): \n",response);
    },
      error: async (error: any) => {
      this.ngxService.stop();
      console.error(error);
      // if(error.messsage){
      //   // (await this.weLoveLazy.swallMessagesService).tokenInterceptor("error",error.messsage);      
      // }
    }
  })
}
}
