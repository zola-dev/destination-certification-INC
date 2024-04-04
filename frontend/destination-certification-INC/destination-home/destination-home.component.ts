import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WeLoveLazyService } from '../services/we-love-lazy.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { TimerService } from '../services/timer.service';
import { CommonModule } from '@angular/common';
import { StateManagementService } from '../services/state-management.service';
import { TableComponent } from '../table/table.component';
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
  @ViewChild("serechToDo", { read: ViewContainerRef }) containerSerechToDo: ViewContainerRef;
  // @ViewChild("addToDoTable", { read: ViewContainerRef }) containerAddToDoTable: ViewContainerRef;
  public toDo:any=[];
  public tempArr:any=[];
  public config:any;
  public tableheight={value:50,unit:'vh',container:'55vh'};
  public appState:any;

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
      this.state.saveData('appState',{add:false,serech:false,typing :false});
    }
    this.state.tokenTimerCast$.subscribe(token => this.tokenTimer = token);
    this.state.toDoCast$.subscribe(toDo => this.toDo = toDo);
    this.state.appStateCast$.subscribe(toDo => this.appState = toDo);
    this.state.tempArrCast$.subscribe((tempArr) => {this.tempArr = tempArr});
    if(this.appState.typing){
      this.handleRefresh();
    }
    this.table(this.tableheight);
  }
  async queryAuth(){
    (await this.weLoveLazy.queryAuth).execute();
  }
  async exit(){
    (await((this.weLoveLazy).close)).execute();  
  }
  async handleRowClicked(e){
    (await this.weLoveLazy.updateToDoService).execute({
      item:{id:e.id,update:!e.completed},   
      array:{toDo:this.toDo}
    });
  }
  async handleAddItem(e){
    console.log("handleaddItem:", e);
    (await this.weLoveLazy.addDoToComponent).create("addToDo",{toDo:this.toDo,appState:this.appState},this.containerAddToDo);
    this.appState.add=!this.appState.add;
    this.state.saveData('appState',this.appState);
  }
  async handleSearchTable(e){
    console.log("handlesearchTable:", e);
    (await this.weLoveLazy.searchComponent).create("serechToDo",{toDo:this.toDo,appState:this.appState},this.containerSerechToDo);
    this.appState.serech=!this.appState.serech;
    this.state.saveData('appState',this.appState);
  }
  async handleDeleteItem(e){
    console.log("handleDeleteItem:", e);
    (await this.weLoveLazy.deleteToDoService).execute({
      item:{id:e.id},   
      array:{toDo:this.toDo}
    });
  }
  table(data){
    //  this.config = this.tablelConfigs.doDoConfig({value:this.tableheight.value,unit:this.tableheight.unit});
 
    this.config = { 
      id:'1',
      title: 'toDo Table',
       width: {
         "value": 50,
         "unit": "vw"
       },
      //    height: {
      //    "value": data.value,
      //    "unit": data.unit,
      //  },
       height: {
         "value": this.tableheight.value,
         "unit": this.tableheight.unit
       },
      //rename Titles
      columns : [
       { title: 'userName', targetField:'name' },
       { title: 'userId', targetField:'id' },
       ],
      rowNO:5,
      clickable:{
       id: 'completed',
       field:'completed',
       button :
       {
         cl:'fa-regular',
         true:'fa-circle-check',
         false:'fa-circle-xmark'
       },
      }
      };
  }
   handleRefresh(){
      this.tempArr=this.state.getLS("tempArr");
      this.state.saveData('toDo',this.tempArr);
      this.state.saveData('tempArr',null);
      this.appState={add:false,serech:false,typing:false}
      this.state.saveData('appState',this.appState);       
   }
   ngOnDestroy(): void {
  }
}
