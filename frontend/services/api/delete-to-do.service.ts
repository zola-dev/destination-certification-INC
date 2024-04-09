import { Injectable } from '@angular/core';
import { WeLoveLazyService } from '../we-love-lazy.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class DeleteToDoService {
  constructor(
    private weLoveLazy:WeLoveLazyService,
    private ngxService : NgxUiLoaderService
  ) { }
  async execute(data) {
    this.ngxService.start();
  (await this.weLoveLazy.ApiService).deleteToDo(data.item.id).subscribe({
    next: async (response:any)=>{
    this.ngxService.stop();
    (await this.weLoveLazy.modifyLSService).execute(data,response.message);
   },
    error: (error:any)=>{
    this.ngxService.stop();
   }   
  })
}
}
