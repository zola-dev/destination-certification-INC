import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { AbstractControl } from '@angular/forms';
import { WeLoveLazyService } from '../services/we-love-lazy.service';
import { StateManagementService } from '../services/state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';

  @Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
  standalone: true,
  imports:
  [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ]
})
export class AddComponent implements OnInit, AfterViewInit, OnDestroy {
  public gsap:any=null;
  public tlAdd:any=null;
  toDoForm: any = FormGroup;
  public name = true;
  public toDo :any;
  public appState :any;
  public completed :boolean=false;
  add=false;
  @Input() data: any;
  // @Input() startupData: any;
  constructor(
    private formBulider: FormBuilder,
    private weLoveLazy:WeLoveLazyService,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
  ) { }
  ngOnInit(): void {
    this.weLoveLazy.loadJS('_gsap')
    .then((gsap) => {
      this.gsap=(window as any).gsap;
      this.toggle()    
  });
  this.toDo=this.data.toDo;
  this.appState=this.data.appState;

  this.state.toDoCast$.subscribe(toDo => this.toDo = toDo);
  this.state.appStateCast$.subscribe(toDo => this.appState = toDo);
  this.state.appStateCast$.subscribe((appState) => {
    if(this.add!=this.appState.add){
    if(this.tlAdd){
      if(this.appState.add){
        this.tlAdd.reverse();
      }else{
        this.tlAdd.play();
      }
    } 
  }
    this.add = this.appState.add;
    this.appState = appState;
  });
  this.toDoForm = this.formBulider.group({
    name: 
    [null,[this.validator]]
  })
  }
  ngAfterViewInit(): void {
  }
  toggle(){
  this.tlAdd=this.weLoveLazy.gsap({
      gsap:this.gsap,
      id:'addToDo',
      height:'13vh',
      y:0
    });
  }
  ngOnDestroy(): void {
  }
  async handleSubmit(){
   (await this.weLoveLazy.addDoToApi).execute({
    item:{id:this.toDo.length,name:this.toDoForm.value.name,completed:this.completed},
    array:{toDo:this.toDo}
    })
    .then((res) => {
      console.log("res: ",res)
      this.completed=false;
      this.toDoForm.reset();
      })
  }
  Inside(x){ 
      switch(x){
        case 'name':
          this.name = false;
          break;   
        //add other cases as it needed  
      }
  }
  Outside(x){
      if(!this.toDoForm.value.name){
        switch(x){
          case 'name':
            this.name = true;
            break;    
        //add other cases as it needed  
          }    
      }  
  }
  complete(){
    this.completed=!this.completed
  }
  validator(control:AbstractControl):{[key:string]:number}|null{
  const value = control.value;
  if (value&&(value.length>0&&value.length<11)){
    return null;
  }else if(!control.value){
   return { invalidLength: 0 };
  }
  return { invalidLength: value.length };
}
type(){
  if(this.toDoForm.value.name.length>20){
    this.toDoForm.patchValue({name: this.toDoForm.value.name.slice(0, -1)});
  }
}
}

