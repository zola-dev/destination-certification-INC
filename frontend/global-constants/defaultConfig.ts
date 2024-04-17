import { Table } from '../interfaces/table'
let toDoHeightValue = 50;
let toDoHeightUnit : Table['height'] = 'vh';
let toDoContainer = toDoHeightValue + 5;

export const defaultConfig = {
    appState:{
        add:false,
        search:false,
        typing :false
        },
    //tables:
    toDoConfig:{
        config:{value:toDoHeightValue,unit:toDoHeightUnit,name:'toDoConfig'},
        container:toDoContainer+toDoHeightUnit
    },
    //lazy components
    search:{
        showOptions:{
            wildCard:true,
            caseSensitive:true,
        },
        wildCard:false,
        caseSensitive:true,
        maxLength:20
    }
    //add more as needed
  };