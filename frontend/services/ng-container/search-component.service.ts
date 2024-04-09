import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SearchComponentService {
  async create(id,data,container){
    try {
      let el=document.getElementById(id);
      if(!el){
      let { SearchComponent } = await import('../../search/search.component');
      container.clear();
      let componentRef=container.createComponent(SearchComponent);
      componentRef.instance.data = data;
      console.log("instance search: ", data);
      }else{
        // const existingComponentRef = container.get(AddComponent);
        // existingComponentRef.instance.startupData = data; 
        console.log("SearchComponent cached");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
