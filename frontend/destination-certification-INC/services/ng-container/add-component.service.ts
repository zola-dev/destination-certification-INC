import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AddComponentService {
  async create(id,data,container){
    try {
      let el=document.getElementById(id);
      if(!el){
        let { AddComponent } = await import('../../add/add.component');
        container.clear();
        let componentRef=container.createComponent(AddComponent);
        componentRef.instance.data = data;
        console.log("instance toDo: ", data);
      }else{
        // const existingComponentRef = container.get(AddComponent);
        // existingComponentRef.instance.startupData = data; 
        console.log("AddComponent cached");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
