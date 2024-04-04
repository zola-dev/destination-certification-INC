import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WeLoveLazyService } from '../services/we-love-lazy.service';
import { StateManagementService } from '../services/state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports:
  [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  searchToDoForm: any = FormGroup;
  gsap:any=null;
  tlSearch:any=null;
  toDo:any;
  tempArr :any;
  appState :any;
  search :false;
  @Input() data :any;
  constructor(
    private formBulider: FormBuilder,
    private weLoveLazy:WeLoveLazyService,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
  ) { }
  ngOnInit(): void {
    this.toDo=this.data.toDo;
    this.appState=this.data.appState;
    this.state.toDoCast$.subscribe((toDo) => {
      this.toDo = toDo;
    });
    this.state.appStateCast$.subscribe((appState) => {
      if(this.search!=this.appState.serech){
        if(this.tlSearch){
          if(this.appState.serech){
            this.tlSearch.reverse();
          }else{
            this.tlSearch.play();
          }
        } 
      }  
      this.search=this.appState.serech
      this.appState = appState;
      if(!this.tempArr){
        this.state.saveData('tempArr',this.toDo);
      }
    });
    this.state.tempArrCast$.subscribe((tempArr) => {
      this.tempArr = tempArr;
    });
    this.weLoveLazy.loadJS('_gsap')
    .then((gsap) => {
      this.gsap=(window as any).gsap;
      this.toggle()    
  });
  this.searchToDoForm = this.formBulider.group({
    search: [null]
  })
  }
  type(){
    this.toDo = this.filterByPrefix(this.tempArr,this.searchToDoForm.value.search); 
    this.state.saveData('toDo',this.toDo);
    this.appState.typing=true;
    this.state.saveData('appState',this.appState);
  }
  filterByPrefix(arr: any, prefix: string): any {
    return arr.filter(item => item.name.startsWith(prefix));
  }
  toggle(){
  this.tlSearch=this.weLoveLazy.gsap({
      gsap:this.gsap,
      id:'serechToDo',//14vh
      y:1300/window.innerHeight,
      height:'7.14286vh',
      transition:0,
      zIndex:1
    });
  }
  ngOnDestroy(): void {
   }
}
