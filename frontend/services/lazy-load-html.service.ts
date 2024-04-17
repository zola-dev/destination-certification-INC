import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LazyLoadHtmlService {
  constructor() { }
  async execute(){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              for(var i=0; i<document.getElementsByTagName('section').length;i++) {  
                  if(document.getElementsByTagName('section')[i]){
                      let id = document.getElementsByTagName('section')[i].id;
                      if(entry.target.id&&entry.target.id==id){
                      // console.log("entry found"); 
                          if(!document.getElementById(id).children[0]
                          ){
                              //entry.target.innerHTML  = `<object type="text/html" data=${id.substring(id.indexOf("."),id.length)}></object>`;   
                              // fadeOut(entry.target,.2,0);                      
                              console.log(id.substring(0,id.indexOf("."))," lazy loaded ",id.substring(id.indexOf("."),id.length));
                              // observer.disconnect(); 
                          }else{
                              console.log(id.substring(0,id.indexOf("."))," cached ",id.substring(id.indexOf("."),id.length));
                          }
                      }else{
                      // console.log("entry not found"); 
                      }        
                  }
              }
      }
      });
  });
  for(var i=0; i<document.getElementsByTagName('section').length;i++) {  
      observer.observe(document.getElementsByTagName('section')[i]);
  }
  }
  justLoadinSourceMaps(){
    
  }
}
