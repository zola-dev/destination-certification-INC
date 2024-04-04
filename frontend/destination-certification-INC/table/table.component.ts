import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { StateManagementService } from '../services/state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports:
  [
     CommonModule,
     ScrollingModule,
  ]
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {  
@Input() config : any//tableConfig
@Input() data: any;
 dataSource: any;
 tempArr: any;
 appState: any;
@Output() RowClicked = new EventEmitter<any>(); 
@Output() add = new EventEmitter<any>(); 
@Output() search = new EventEmitter<any>(); 
@Output() delete = new EventEmitter<any>(); 
private cdkVS: CdkVirtualScrollViewport;
@ViewChild("Table", { read: CdkVirtualScrollViewport }) set Table(Table: CdkVirtualScrollViewport) {
  if (Table) {
    this.cdkVS = Table;
  }
}
public titles:any;
public ObjKeys : any;
public rowHeight :any;
public rowHeightPx :any;
public fontSize :any;
public rowWidth :any;
public scrollWidth :any;
public viewport :any;
public showTable :boolean=false;
public headerBtn: string;
    constructor (
      @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
   ){ }
  ngOnInit(): void {
    this.dataSource=this.data.toDo;
    this.appState=this.data.appState;
    this.tempArr=this.data.tempArr;
    this.state.toDoCast$.subscribe((toDo) => {
      if(toDo&&this.dataSource&&toDo.length!=this.dataSource.length){
        console.log("scrolled to",toDo.length);
        this.scrollToIndex({target:toDo.length}); 
      } 
      this.dataSource = toDo;
    });
    this.state.appStateCast$.subscribe(toDo => this.appState = toDo);
    this.state.tempArrCast$.subscribe((tempArr) => {this.tempArr = tempArr});
    this.createTitles();
    this.setSizes();
  }
  createTitles(){
    this.ObjKeys = Object.keys(this.dataSource[0]);
    this.titles= [...this.ObjKeys];
    let col=[...this.config.columns];
    for(var i=0;i<this.titles.length;i++){  
      for(var j=0;j<col.length;j++){
        if(col[j].targetField==this.titles[i]){
          this.titles[i] = col[j].title;          
          col.splice(j, 1);
        }
      }  
    }
  } 
  ngAfterViewInit(): void {       
    this.adjustWidth();
  }
  ngOnDestroy(): void {
  }
    setSizes(){
      this.rowHeight=this.config.height.value/(this.config.rowNO+2);
      this.viewport=this.rowHeight*this.config.rowNO+this.config.height.unit;
      this.fontSize=this.rowHeight/4+this.config.height.unit;
      this.rowHeightPx=window.innerHeight * this.rowHeight / 100;
      this.rowHeight=this.rowHeight+this.config.height.unit;
    }
    adjustWidth(){
      setTimeout(()=>{   
        const scroll = document.getElementById('scroll_viewport'+this.config.id);
        this.scrollWidth= 100*(scroll.offsetWidth-scroll.scrollWidth)/window.innerWidth;
        console.log('scrollWidth: ',this.scrollWidth);
        this.rowWidth=(this.config.width.value-this.scrollWidth)/this.config.rowNO+this.config.width.unit;
        this.headerBtn= this.scrollWidth+4;
        this.scrollWidth=this.scrollWidth+this.config.width.unit;
        this.headerBtn=this.headerBtn+this.config.width.unit;
        this.showTable=true;      
        }, 400);
    }
    submit(data){
    console.log("submit:", data);
      this.RowClicked.emit(data);
    }
    searchTable(){
      this.search.emit('search');
    }
    addItem(){
      this.add.emit('add'); 
    }
    deleteItem(data){
      this.delete.emit(data); 
    }
    async scrollToIndex(arg) {    
      if (this.cdkVS) {
      this.cdkVS.checkViewportSize();
      this.cdkVS.scrollToIndex(arg.target,'smooth');
      }     
    };
}


