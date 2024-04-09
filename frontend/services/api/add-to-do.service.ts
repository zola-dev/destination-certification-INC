import { Injectable } from '@angular/core';
import { WeLoveLazyService } from '../we-love-lazy.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class AddToDoService {
  constructor(
    private weLoveLazy:WeLoveLazyService,
    private ngxService : NgxUiLoaderService
  ) { }
  async execute(data) {
    this.ngxService.start();
    (await this.weLoveLazy.ApiService).addToDo(data.item).subscribe({
      next: async (response: any) => {
       this.ngxService.stop();
       data.item.id=response.insertId;
      (await this.weLoveLazy.insertLSService).execute(data,response.message);
      console.log("toDo stored, response (API): : \n",response);
    },
      error: async (error: any) => {
      this.ngxService.stop();
      console.error(error);
    }
  })
}
}
