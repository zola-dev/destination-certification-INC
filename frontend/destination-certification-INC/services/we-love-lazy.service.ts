//angular imports
import { Injectable, Injector, ProviderToken } from '@angular/core';

//helper imports
import { ApiService } from './api.service';
import { CloseService } from './close.service';
import { SwallMessagesService } from './swall-messages.service';

//api imports
import { QueryAuthService } from './query-auth.service';
import { loginService } from './api/login.service';
import { AddToDoService } from './api/add-to-do.service';
import { UpdateToDoService } from './api/update-add-to-do.service';

//Local Storage imports
import { LoginLSService } from './local-storage/login-ls.service';
import { AddToDoLSService } from './local-storage/add-to-do-ls.service';
import { UpdateToDoLSService } from './local-storage/update-to-do-ls.service';

//imports for lazy-loading Components without routes  
import { AddComponentService } from './ng-container/add-component.service';
import { SearchComponentService } from './ng-container/search-component.service';
import { DeleteToDoService } from './api/delete-to-do.service';

@Injectable({
  providedIn: 'root'
})
export class WeLoveLazyService {
   //helper services
   private _ApiService: Promise<ApiService>=null;
   private _close: Promise<CloseService>=null;
   private _swallMessagesService: Promise<SwallMessagesService>=null;

   //api calls
   private _queryAuth: Promise<QueryAuthService>=null;
   private _login: Promise<loginService>=null;
   private _addDoToApi: Promise<AddToDoService>=null;
   private _updateToDoService: Promise<UpdateToDoService>=null;
   private _deleteToDoService: Promise<DeleteToDoService>=null;

   //Local Storage services
   private _loginLSService: Promise<LoginLSService>=null;
   private _addToDoLSService: Promise<AddToDoLSService>=null;
   private _updateToDoLSService: Promise<UpdateToDoLSService>=null;

   //services for lazy-loading Components without routes 
   private _addDoToComponent: Promise<AddComponentService>=null;
   private _searchComponentService: Promise<SearchComponentService>=null;

   //gsap
   public _gsap="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";

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
  get addToDoLSService(){
    if(this._addToDoLSService){
      return this._addToDoLSService
    }else{
      this._addToDoLSService = this.get<AddToDoLSService>(() =>
      import('./local-storage/add-to-do-ls.service').then((m) => m.AddToDoLSService));
      return this._addToDoLSService;
    }   
  }
  get updateToDoLSService(){
    if(this._updateToDoLSService){
      return this._updateToDoLSService
    }else{
      this._updateToDoLSService = this.get<UpdateToDoLSService>(() =>
      import('./local-storage/update-to-do-ls.service').then((m) => m.UpdateToDoLSService));
      return this._updateToDoLSService;
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

  //links
  loadStyle(styleName: string) {
    console.log(this[styleName]);
    //const head = this.document.getElementsByTagName('head')[0];
    const head = document.getElementsByTagName('head')[0];
    //let themeLink = this.document.getElementById(
      let styleNameEl = document.getElementById(styleName) as HTMLLinkElement;
    if (styleNameEl) {
      console.log(styleName, "exist");
      // styleNameEl.href = this[styleName];
      // styleNameEl.media = 'all';
      //themeLink.onload = "this.media='all'";
    } else {
      console.log(styleName, "created");
      //const style = this.document.createElement('link');
      const style = document.createElement('link');
      style.id = styleName;
      style.rel = 'stylesheet';
      style.href = `${this[styleName]}`;
      style.media ='all';
      //style.onload ="this.media='all'";

      head.appendChild(style);
    }
  }
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
  gsap(data){
    let el = document.getElementById(data.id);
    let timeline = data.gsap.timeline({ paused: false });
    timeline.to(el, {
        y: data.y,
        duration: .7, 
        ease: "power1.inOut",
        // scrollTrigger: {
        //     trigger: '#header', 
        //     start: '20% top', 
        //     end: '20% top',
        //     // markers:true,      
        //     scrub: 1, 
        //     delay:1,
        //     snap: {
        //     duration: { min: 0.2, max: 3 },
        //     ease:"power1.out", 
        //     }
        // },
        onComplete: () => {
          if(!data.time){
            data.time=0;
          }
          setTimeout(()=>{  
          if(data.height){
          el.style.height=`${data.height}`;
          //el.setAttribute("style", data.style);
          }
          if(data.transition){
            el.style.transition=`${data.transition}`;
            }
            if(data.zIndex){
              el.style.zIndex=`${data.zIndex}`;
              }
          }, data.time); 
          }
    });
    return timeline;
  }
}
