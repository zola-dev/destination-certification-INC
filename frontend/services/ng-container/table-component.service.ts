import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TableComponentService {
  async create(data,container){
    try {
      const { TableComponent } = await import('../../table/table.component');
      container.clear();
      let componentRef=container.createComponent(TableComponent);
      componentRef.instance.update = data.userDataJSON;
    } catch (error) {
      console.log(error);
    }
  }
}
