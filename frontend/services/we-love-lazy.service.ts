//angular imports
import { Injectable, Injector, ProviderToken } from '@angular/core';

//helper imports
import { ApiService } from './api.service';
import { CloseService } from './close.service';
import { SwallMessagesService } from './swall-messages.service';
import { HandleRefreshService } from './handle-refresh.service';
import { ClTimeoutService } from './cl-timeout.service';


//api imports
import { QueryAuthService } from './query-auth.service';
import { loginService } from './api/login.service';
import { AddToDoService } from './api/add-to-do.service';
import { UpdateToDoService } from './api/update-add-to-do.service';

//Local Storage imports
import { LoginLSService } from './local-storage/login-ls.service';
import { InsertLSService } from './local-storage/insert-ls.service';
import { ModifyLSService } from './local-storage/modify-ls.service';

//imports for lazy-loading Components without routes  
import { AddComponentService } from './ng-container/add-component.service';
import { SearchComponentService } from './ng-container/search-component.service';
import { DeleteToDoService } from './api/delete-to-do.service';

//constants
import { TableConfigsService } from './global-constants/table-configs.service';

//animations
import { ToggleService } from './animations/toggle.service';


@Injectable({
  providedIn: 'root'
})
export class WeLoveLazyService {
   //helper services
   private _ApiService: Promise<ApiService>=null;
   private _close: Promise<CloseService>=null;
   private _swallMessagesService: Promise<SwallMessagesService>=null;
   private _handleRefresh: Promise<HandleRefreshService>=null;
   private _clTimeoutService: Promise<ClTimeoutService>=null;

   //api calls
   private _queryAuth: Promise<QueryAuthService>=null;
   private _login: Promise<loginService>=null;
   private _addDoToApi: Promise<AddToDoService>=null;
   private _updateToDoService: Promise<UpdateToDoService>=null;
   private _deleteToDoService: Promise<DeleteToDoService>=null;

   //Local Storage services
   private _loginLSService: Promise<LoginLSService>=null;
   private _insertLSService: Promise<InsertLSService>=null;
   private _modifyLSService: Promise<ModifyLSService>=null;

   //services for lazy-loading Components without routes 
   private _addDoToComponent: Promise<AddComponentService>=null;
   private _searchComponentService: Promise<SearchComponentService>=null;

   //gsap
   public _gsap="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
   public _gsapScroll="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

   
   //constants
   private _tableConfigs: Promise<TableConfigsService>=null;

   //animations
   private _toggle: Promise<ToggleService>=null;

  constructor(
    private injector: Injector,
  ) { }

  async get<T>(providerLoader: () => Promise<ProviderToken<T>>) {
    return this.injector.get(await providerLoader());
  }
  //helper gets
  get ApiService(){
    if(this._ApiService){
      return this._ApiService
    }else{
      this._ApiService = this.get<ApiService>(() =>
      import('./api.service').then((m) => m.ApiService)); 
      return this._ApiService;
    }    
  }
  get close(){
    if(this._close){
      return this._close
    }else{
      this._close = this.get<CloseService>(() =>
      import('./close.service').then((m) => m.CloseService));
      return this._close;
    }    
  }
  get swallMessagesService(){
    if(this._swallMessagesService){
      return this._swallMessagesService
    }else{
      this._swallMessagesService = this.get<SwallMessagesService>(() =>
      import('./swall-messages.service').then((m) => m.SwallMessagesService));
      return this._swallMessagesService;
    }   
  }
  get handleRefresh(){
    if(this._handleRefresh){
      return this._handleRefresh
    }else{
      this._handleRefresh = this.get<HandleRefreshService>(() =>
      import('./handle-refresh.service').then((m) => m.HandleRefreshService));
      return this._handleRefresh;
    }   
  }
  get clTimeoutService(){
    if(this._clTimeoutService){
      return this._clTimeoutService
    }else{
      this._clTimeoutService = this.get<ClTimeoutService>(() =>
      import('./cl-timeout.service').then((m) => m.ClTimeoutService));
      return this._clTimeoutService;
    }   
  }
  

  //api gets
  get queryAuth(){
    if(this._queryAuth){
      return this._queryAuth
    }else{
      this._queryAuth = this.get<QueryAuthService>(() =>
      import('./query-auth.service').then((m) => m.QueryAuthService)); 
      return this._queryAuth;
    }    
  }  
  get login(){
    if(this._login){
      return this._login
    }else{
      this._login = this.get<loginService>(() =>
      import('./api/login.service').then((m) => m.loginService)); 
      return this._login;
    }    
  }  
  get addDoToApi(){
    if(this._addDoToApi){
      return this._addDoToApi
    }else{
      this._addDoToApi = this.get<AddToDoService>(() =>
      import('./api/add-to-do.service').then((m) => m.AddToDoService));
      return this._addDoToApi;
    }    
  }
  get updateToDoService(){
    if(this._updateToDoService){
      return this._updateToDoService
    }else{
      this._updateToDoService = this.get<UpdateToDoService>(() =>
      import('./api/update-add-to-do.service').then((m) => m.UpdateToDoService));
      return this._updateToDoService;
    }    
  }
  get deleteToDoService(){
    if(this._deleteToDoService){
      return this._deleteToDoService
    }else{
      this._deleteToDoService = this.get<DeleteToDoService>(() =>
      import('./api/delete-to-do.service').then((m) => m.DeleteToDoService));
      return this._deleteToDoService;
    }    
  }

  //Local Storage gets
  get loginLSService(){
    if(this._loginLSService){
      return this._loginLSService
    }else{
      this._loginLSService = this.get<LoginLSService>(() =>
      import('./local-storage/login-ls.service').then((m) => m.LoginLSService));
      return this._loginLSService;
    }   
  }
  get insertLSService(){
    if(this._insertLSService){
      return this._insertLSService
    }else{
      this._insertLSService = this.get<InsertLSService>(() =>
      import('./local-storage/insert-ls.service').then((m) => m.InsertLSService));
      return this._insertLSService;
    }   
  }
  get modifyLSService(){
    if(this._modifyLSService){
      return this._modifyLSService
    }else{
      this._modifyLSService = this.get<ModifyLSService>(() =>
      import('./local-storage/modify-ls.service').then((m) => m.ModifyLSService));
      return this._modifyLSService;
    }   
  }

  //gets for lazy-loading Components without routes 
  get addDoToComponent(){
    if(this._addDoToComponent){
      return this._addDoToComponent
    }else{
      this._addDoToComponent = this.get<AddComponentService>(() =>
      import('./ng-container/add-component.service').then((m) => m.AddComponentService));
      return this._addDoToComponent;
    }    
  }
  get searchComponent(){
    if(this._searchComponentService){
      return this._searchComponentService
    }else{
      this._searchComponentService = this.get<SearchComponentService>(() =>
      import('./ng-container/search-component.service').then((m) => m.SearchComponentService));
      return this._searchComponentService;
    }    
  }

  //constants
  get tableConfigs(){
    if(this._tableConfigs){
      return this._tableConfigs
    }else{
      this._tableConfigs = this.get<TableConfigsService>(() =>
      import('./global-constants/table-configs.service').then((m) => m.TableConfigsService));
      return this._tableConfigs;
    }    
  }

  //animations
  get toggle(){
    if(this._toggle){
      return this._toggle
    }else{
      this._toggle = this.get<ToggleService>(() =>
      import('./animations/toggle.service').then((m) => m.ToggleService));
      return this._toggle;
    }   
  }

  //JS
  loadJS(jsName: string) {
    return new Promise<any>((resolve, reject) => {
    console.log(this[jsName]);
    const head = document.getElementsByTagName('head')[0];
      let jsNameEl = document.getElementById(jsName) as HTMLScriptElement;
    if (jsNameEl) {
      console.log(jsName, "exist");
      resolve(jsNameEl);
    } else {
      console.log(jsName, "created");
      let script = document.createElement('script');
      script.id = jsName;
      script.src = this[jsName];
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        console.log(jsName, 'loaded successfully');
        resolve(script);
      };
      script.onerror = () => {
        console.error(jsName, 'failed to load');
        reject();
      };
      head.appendChild(script);
    }
  });
  }

}
