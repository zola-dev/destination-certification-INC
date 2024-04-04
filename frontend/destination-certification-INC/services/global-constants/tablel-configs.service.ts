import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablelConfigsService {

  constructor() { }
  doDoConfig(data):any{
    return    { 
       id:'1',
       title: 'toDo Table',
        width: {
          "value": 50,
          "unit": "vw"
        },
          height: {
          "value": data.value,
          "unit": data.unit,
        },
        // height: {
        //   "value": this.tableheight.value,
        //   "unit": this.tableheight.unit
        // },
       //rename Titles
       columns : [
        { title: 'userName', targetField:'name' },
        { title: 'userId', targetField:'id' },
        ],
       rowNO:5,
       clickable:{
        id: 'completed',
        field:'completed',
        button :
        {
          cl:'fa-regular',
          true:'fa-circle-check',
          false:'fa-circle-xmark'
        },
       }
       };
  }
}
