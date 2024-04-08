import { Injectable } from '@angular/core';
import { WeLoveLazyService } from '../we-love-lazy.service';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  public gsap:any=null;
  public gsapScroll:any=null;
  public tlSearch:any=null;
  public tlAdd:any=null;
  public tlTopBlur:any=null;
  public tlBottomBlur:any=null;
  //store other timelines as needed
  constructor(
    private weLoveLazy:WeLoveLazyService,
  ) { }

  execute(appState,tlName){
    console.log(appState,tlName);
    console.log("tlName: ",tlName,);
    if(this[tlName]){
      if(appState){
        this[tlName].play();
      }else{
        this[tlName].reverse();
      } 
    }
  }

  storeTl(config){
    if(!this.gsap||!this[config.tlName]){
      this.weLoveLazy.loadJS('_gsap')
      .then((gsap) => {
        this.gsap=(window as any).gsap;
        this[config.tlName]=this.getGsap({
          gsap:this.gsap,
          id:config.id,
          y:config.y,
          height:config.height,
          transition:config.transition,
          zIndex:config.zIndex
        });  
    }).then(() =>{
    console.log(this[config.tlName], " stored");
    })
    }
  }

//   storeTlScroll(config) {
//     if (!this.gsapScroll || !this[config.tlName]) {
//         this.weLoveLazy.loadJS('_gsap')
//             .then(() => {
//                 this.gsapScroll = (window as any).gsap;
//                 this.weLoveLazy.loadJS('_gsapScroll')
//                 .then(() => {
//                   this.gsapScroll.registerPlugin((window as any).ScrollTrigger);
//                   this[config.tlName] = this.getGsap({
//                       gsap: this.gsapScroll,
//                       id: config.id,
//                       y: config.y,
//                       height: config.height,
//                       transition: config.transition,
//                       zIndex: config.zIndex
//                   });
//                   console.log(this[config.tlName], " stored");
//               })
//             })
      
//             .catch(error => {
//                 console.error('Failed to load GSAP or ScrollTrigger', error);
//             });
//     }
// }

  getGsap(data){
    let el = document.getElementById(data.id);
    let scrollTrigger='#'+data.id;
    let timeline = data.gsap.timeline({ paused: false });
    timeline.to(el, {
        y: data.y,
        duration: .7, 
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: scrollTrigger, 
            start: '20% top', 
            end: '20% top',
            // markers:true,      
            scrub: 1, 
            delay:1,
            snap: {
            duration: { min: 0.2, max: 3 },
            ease:"power1.out", 
            }
        },
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
