import { Inject, Injectable } from '@angular/core';
import { StateManagementService } from '../state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class TableConfigsService {
  constructor(
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
  ) { }
  data:any;
   public toDoConfig(data)
  {
    return{
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
  }
  };
  //Other tables
    tableConfig(data):any{
    this.state.saveData(data.name,(this[data.name])(data));
    }
}
