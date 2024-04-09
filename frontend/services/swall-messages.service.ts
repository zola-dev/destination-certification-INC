import { Injectable } from '@angular/core';
import { LazyInjectService } from 'src/app/shared/lazy-inject.service';
import { Swal2cssService } from 'src/app/shared/swal2css.service';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SwallMessagesService {
  public message = swal.mixin({
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
    timer: 10000,
    color: '#28529f',
    background: '#f9f9f9',
    confirmButtonColor: '#28529f',
  });
  constructor(
    private swal2css: Swal2cssService,
    private lazyInjector: LazyInjectService,
  ) { }
  async execute(resLS,resAPi){
    (await this.lazyInjector.device).get('').then(async clientDevice => {//__zone_symbol__value removed
      if(resLS){
      this.message.fire({
        iconHtml: 
    `
    <div
    style="
    width: 300px;
    position: fixed;
    line-break: anywhere;
    top: 40px;
    ">
    <div id="ellipsisWebsitExistence">
    <div>
    <p class="fa-brands fa-node"
    style="
    color: #18da35;
    font-size: 70px;
    margin-left: 120px;
    ">
    <div style="
    font-size: 14px;
    height: 14px;
    ">Next.js:</div>
    <div style="
    font-size: 11px;
    ">${resAPi}</div>
    </p>
    <p class="fa-brands fa-angular"
    style="
    color: #a6120d;
    font-size: 70px;
    margin-left: 120px;
    ">
    <div style="
    font-size: 14px;
    height: 14px;
    ">Local Storage:</div>
    <div style="
    font-size: 11px;
    ">${resLS}</div>
    </p>
    </div>
    </div>
    </div>
    <img 
    id="websitExistenceImg"
    >        
    <div 
    id="securityDetails"
    class="hideGlobalDeep"
    >
    </div>
    `,   
       timer: 30000999
     });
    }else{
      this.message.fire({ 
        showCancelButton:false,
        showConfirmButton:false,
        title: resAPi.txt,
        timer:10000,
        iconHtml: 
        `<img style="
         position: relative;
         height: 25px;
         width: auto;
         "src="${resAPi.profileImg}">`,
        customClass: {
        },
      })
    }
     this.swal2css.mobileAdjust('iconHtml',clientDevice);
    });
  }
  tokenInterceptor(title,text){
    this.message.fire({ 
      showCancelButton:false,
      showConfirmButton:false,
      title: title,
      text:text,
      timer:10000,
    })
  }
  }

