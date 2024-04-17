import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LettersWordsStylingService {
  public paintT$ = timer(300);
  public originalContentMap = new Map<string, string>();
  constructor() { }
  paintLetter(arrey:any, paint:string, style: string, caseSensitive: boolean) {
    this.paintT$.subscribe(() => {
    console.log("length: ",arrey.length);
    arrey.forEach(item => {   
      let id='letters_'+item.id;
      console.log("id: ",id,"paint: ",paint,"style: ",style);
      this.replace(id,paint,style,caseSensitive);
  });
});
  }
  replace(id: string, paint:string, style: string, caseSensitive:boolean){
    const element = document.getElementById(id);
    if (element) {
      var content = element.innerHTML;
      // element.setAttribute('data-original-content', content);
      this.originalContentMap.set(id, content);
      var flag='g';
      if(!caseSensitive){
        flag='gi'
      }
      const paintedContent = content.replace(new RegExp(paint, flag), match => {
        return `<span style="${style}">${match}</span>`;
      });
      console.log("id: ",id," paintedContent:", paintedContent)
      element.innerHTML = paintedContent;
    }
  }
  revertChanges(arrey:any){
    console.log("length: ",arrey.length);
    arrey.forEach(item => {   
      let id='letters_'+item.id;
      console.log("id: ",id);
      const element = document.getElementById(id);
      if(element){
        // const originalContent = element.getAttribute('data-original-content');
        // if (originalContent) {
        //   element.innerHTML = originalContent;
        //   console.log("originalContent backup:", originalContent);
        //   element.removeAttribute('data-original-content');
        // }
        const originalContent = this.originalContentMap.get(id);
        if (originalContent) {
          element.innerHTML = originalContent;
          console.log("originalContent backup:", originalContent);
          this.originalContentMap.delete(id);
        }
      }
   });
  }
}


