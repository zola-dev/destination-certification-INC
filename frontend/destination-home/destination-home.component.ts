import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WeLoveLazyService } from '../services/we-love-lazy.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { TimerService } from '../services/timer.service';
import { CommonModule } from '@angular/common';
import { StateManagementService } from '../services/state-management.service';
import { TableComponent } from '../table/table.component';
import { ToDo } from '../interfaces/index';
import { defaultConfig } from '../global-constants/defaultConfig'

@Component({
  selector: 'app-destination-home',
  templateUrl: './destination-home.component.html',
  styleUrls: ['./destination-home.component.scss'],
  standalone: true,
  imports:
  [
     CommonModule,
     TableComponent
  ]
})
export class DestinationHomeComponent implements OnInit, OnDestroy {
  public tokenTimer:any;
  @ViewChild("addToDo", { read: ViewContainerRef }) containerAddToDo: ViewContainerRef;
  @ViewChild("searchToDo", { read: ViewContainerRef }) containersearchToDo: ViewContainerRef;
  public toDo:ToDo[]|null=[];
  public tempArr:ToDo[]|null=[];
  public config:any;
  public appState:any;
  toDoConfig=defaultConfig
  constructor(
    private weLoveLazy:WeLoveLazyService,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
    private timer:TimerService,
  ) { }
  ngOnInit(): void {
    this.toDo=this.state.getLS("toDo");
    this.tokenTimer = this.state.getLS("tokenTimer");
    this.appState=this.state.getLS("appState");
    if(this.tokenTimer){
      this.timer.startTimer();
    }else{
      this.queryAuth();
      //+smooth scrolling from GASP
    }//+unsubscribe
    this.state.tokenTimerCast$.subscribe(tokenTimer => this.tokenTimer = tokenTimer);
    this.state.toDoCast$.subscribe(toDo => this.toDo = toDo);
    this.state.appStateCast$.subscribe(appState => this.appState = appState);
    this.state.tempArrCast$.subscribe((tempArr) => {this.tempArr = tempArr});
    if(this.appState&&this.appState.typing){
      this.handleRefresh();
    }
    this.state.saveData('appState',defaultConfig.appState);
    this.tableConfig();
  }
  async queryAuth(){
    (await this.weLoveLazy.queryAuth).execute();
  }
  async exit(){
    (await((this.weLoveLazy).close)).execute();  
  }
  async handleUpdateItem(e){
    (await this.weLoveLazy.updateToDoService).execute({
      item:{id:e.id,completed:!e.completed},   
      array:{toDo:this.toDo},
    });
  }
  async handleAddItem(){
    this.appState.add=!this.appState.add;
    this.state.saveData('appState',this.appState);
    (await this.weLoveLazy.addDoToComponent).create(
      "addToDo",
    {
      toDo:this.toDo,
      appState:this.appState,
    },
    this.containerAddToDo);
  }
  async handleSearchTable(){
    this.appState.search=!this.appState.search;
    this.state.saveData('appState',this.appState);
    (await this.weLoveLazy.searchComponent).create(
      "searchToDo",
    {
      toDo:this.toDo,
      appState:this.appState,
      config:defaultConfig.search
    },
    this.containersearchToDo); 
  }
  async handleDeleteItem(e){
    (await this.weLoveLazy.deleteToDoService).execute({
      item:{id:e.id},   
      array:{toDo:this.toDo},
    });
  }
  async tableConfig(){
    this.config = this.state.getLS(defaultConfig.toDoConfig.config.name);
    if(!this.config){
      this.config = (await this.weLoveLazy.tableConfigs).tableConfig(defaultConfig.toDoConfig.config);
    }
    this.state.toDoConfigCast$.subscribe(toDoConfig => this.config = toDoConfig);
  }
   async handleRefresh(){
    (await this.weLoveLazy.handleRefresh).execute();    
   }
   ngOnDestroy(): void {
  }
}
