import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StateManagementService } from '../services/state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { gsapConfigs } from '../global-constants/gsapConfigs'
import { ToggleService } from '../services/animations/toggle.service';
import { LazyLoadHtmlService } from '../services/lazy-load-html.service';
import { LettersWordsStylingService } from '../services/animations/letters-words-styling.service';
import { timer } from 'rxjs';
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
  public searchToDoForm: any = FormGroup;
  public toDo:any;
  public tempArr :any;
  public appState :any;
  public search=false;
  public config:any;
  public arrMethod:string='startsWith';
  public filterArrT$ = timer(300);
  @Input() data :any;
  constructor(
    private formBulider: FormBuilder,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
    private toggle: ToggleService,
    private lazyLoadHtml:LazyLoadHtmlService,
    private letters: LettersWordsStylingService,
  ) { }
  ngOnInit(): void {
    this.toDo=this.data.toDo;
    this.appState=this.data.appState;
    this.config=this.data.config;
    this.state.toDoCast$.subscribe((toDo) => {
      this.toDo = toDo;
    });
    this.state.appStateCast$.subscribe((appState) => {
      if(appState&&this.search!=appState.search){
      this.toggle.execute(appState.search ,gsapConfigs.searchToDo.tlName);
      this.search = appState.search;
      }  
      if(this.tempArr&&!appState.search){
        this.state.saveData('toDo',this.tempArr);
        this.state.saveData('tempArr',null);
        this.appState.typing=false;
        this.state.saveData('appState',this.appState);
        this.searchToDoForm.reset();
      }
      this.appState = appState;
    });
    this.state.tempArrCast$.subscribe((tempArr) => {
      this.tempArr = tempArr;
    });
    this.setArrMethod();
    console.log("config: ", this.config);
  this.toggle.storeTl((gsapConfigs.searchToDo));
  this.searchToDoForm = this.formBulider.group({
    search: [null]
  })
  }
  setArrMethod(){
    if(!this.config.wildCard){
      this.arrMethod='startsWith'
    }else{
      this.arrMethod='includes';
      // this.weLoveLazy.loadJS('_deqaf');
      // this.weLoveLazy.loadJS('_lettersWordsStyling');
    }
  }
  wildCard(){
    this.config.wildCard=!this.config.wildCard;
    this.setArrMethod();
    if(this.searchToDoForm.value.search&&this.searchToDoForm.value.search.length>0){
      this.type();
    }
  }
  caseSensitive(){
    this.config.caseSensitive=!this.config.caseSensitive;
    if(this.searchToDoForm.value.search&&this.searchToDoForm.value.search.length>0){
      this.type();
    }
  }
  type(){
    if(!this.tempArr){
      this.state.saveData('tempArr',this.toDo);//lazyLoadHtml observe sections with unique table id "table_{{config.id}}_itemId" 
      this.lazyLoadHtml.justLoadinSourceMaps();//and lazy load html with colorizeLetters as needed, in porgress...
    }
    if(this.searchToDoForm.value.search&&this.searchToDoForm.value.search.length>this.config.maxLength){
      this.searchToDoForm.patchValue({search: this.searchToDoForm.value.search.slice(0, -1)});
    }
    // this.letters.revertChanges(this.toDo); //reset paint
    this.toDo = this.filterArr(this.tempArr,this.searchToDoForm.value.search);//make a config for search that we need, case sensitive, include,
    var authKey=localStorage.getItem('authKey');
    if(this.arrMethod=='includes'&&authKey=='zola'
    &&this.searchToDoForm.value.search
    &&this.searchToDoForm.value.search.length>0
    ){//testing with my authKey
    this.letters.paintLetter(this.toDo,this.searchToDoForm.value.search,'color:#ff5d5d;',this.config.caseSensitive); // Example styling
    }
    this.state.saveData('toDo',this.toDo);
    if(!this.appState.typing){
      this.appState.typing=true;
      this.state.saveData('appState',this.appState);
    }
  }
  filterArr(arr: any, txt: string): any {
    if(this.config.caseSensitive){
      return arr.filter(item => item.name[this.arrMethod](txt));
    }else{
      return arr.filter(item => item.name.toLowerCase()[this.arrMethod](txt.toLowerCase()));
    }
  }

  ngOnDestroy(): void {
   }
}
