import{environment} from '../../../environments/environment';
  export const nextApis = {
    login:environment.nextApiUrl+'/api/login',
    updateToDo:environment.nextApiUrl+'/api/updateToDo',
    addToDo:environment.nextApiUrl+'/api/addToDo',
    deleteToDo:environment.nextApiUrl+'/api/deleteToDo',
  };