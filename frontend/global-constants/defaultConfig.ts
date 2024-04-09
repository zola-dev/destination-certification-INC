import { Table } from '../interfaces/table'
let toDoHeightValue = 50;
let toDoHeightUnit : Table['height'] = 'vh';
let toDoContainer = toDoHeightValue + 5;

export const defaultConfig = {
    appState:{
        add:false,
        serech:false,
        typing :false
        },
    //tables:
    toDoConfig:{
        config:{value:toDoHeightValue,unit:toDoHeightUnit,name:'toDoConfig'},
        container:toDoContainer+toDoHeightUnit
    }
    //add more as needed
  };