import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, TrackByFunction, ViewChild } from '@angular/core';
import { ScrollingModule  } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { StateManagementService } from '../services/state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { debounceTime, timer } from 'rxjs';
// import { gsapConfigs } from '../global-constants/gsapConfigs';

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
public tableT$ = timer(400);
public scroll = {start:0,end:0}
j: number[] = []; 
delay: any[] = []; 
public blurHeigth :any;
public blurWidth :any;

    constructor (
      @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
   ){ }
  ngOnInit(): void {
    this.dataSource=this.data.toDo;
    this.appState=this.data.appState;
    this.tempArr=this.data.tempArr;
    this.state.toDoCast$.subscribe((toDo) => {
      if(toDo&&this.dataSource&&toDo.length>this.dataSource.length&&this.appState&&!this.appState.typing
        ){
        console.log("scrolled to",toDo.length);
        this.scrollToIndex({target:toDo.length}); 
      } 
      this.dataSource = toDo;
    });
    this.state.appStateCast$.subscribe(appState => this.appState = appState);
    this.state.tempArrCast$.subscribe((tempArr) => {this.tempArr = tempArr});
    this.createTitles();
    this.setSizes();
    //in porgress
    // let topBlur={
    //   id:`scroll_viewport${this.config.id}`,
    //   y:0,
    //   zIndex:1020,
    //   tlName:'tlTopBlur',
    // }
    //   let bottomBlur={
    //   id:`scroll_viewport${this.config.id}`,
    //   y:0,
    //   zIndex:1020,
    //   tlName:'tlBottomBlur',
    // }
    // this.toggle.storeTl((topBlur));
    // this.toggle.storeTl((bottomBlur));//in progress 
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
    console.log("titles created: ",this.titles)
  } 
  ngAfterViewInit(): void {       
    this.adjustWidth();
    this.scroll.end=this.scroll.start+this.config.rowNO+2;
    this.cdkVS.elementScrolled().pipe(
      debounceTime(10)
    ).subscribe(() => {
      if( this.scroll.start!=this.cdkVS.getRenderedRange().start||
      this.scroll.end!=this.cdkVS.getRenderedRange().end){
        this.checkVisible();    
      }
  });
  }
  checkVisible() {
    this.scroll.start=this.cdkVS.getRenderedRange().start;
    this.scroll.end=this.scroll.start+this.config.rowNO+2;
    let k=0;
    for (let i = this.scroll.start; i < this.scroll.end; i++) {  
      this.j[i] = k;
      let t = ((1*k)/10).toString();
      this.delay[i]=t+'s'
      k++;   
    }
  }
    setSizes(){
      this.rowHeight=this.config.height.value/(this.config.rowNO+2);
      this.blurHeigth+this.config.height.unit;
      this.viewport=this.rowHeight*(this.config.rowNO)+this.config.height.unit;
      this.fontSize=this.rowHeight/4+this.config.height.unit;
      if(this.config.height.unit='vh'){
        this.rowHeightPx= window.innerHeight * this.rowHeight / 100;
      }else{
        this.rowHeightPx= window.innerWidth * this.rowHeight / 100;
      }
      this.rowHeight=this.rowHeight+this.config.height.unit;
    }
    adjustWidth(){
      this.tableT$.subscribe(() => {
        const scroll = document.getElementById('scroll_viewport'+this.config.id);
        this.scrollWidth= 100*(scroll.offsetWidth-scroll.scrollWidth)/window.innerWidth;
        this.blurWidth=(this.config.width.value-this.scrollWidth)+this.config.width.unit;
        this.rowWidth=(this.config.width.value-this.scrollWidth)/this.config.rowNO+this.config.width.unit;
        this.headerBtn= this.scrollWidth+4;
        this.scrollWidth=this.scrollWidth+this.config.width.unit;
        this.headerBtn=this.headerBtn+this.config.width.unit;
        this.showTable=true;      
        });
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
    ngOnDestroy(): void {
    }
}


