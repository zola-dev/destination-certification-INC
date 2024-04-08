import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StateManagementService } from '../services/state-management.service';
import { STATE_SERVICE_TOKEN } from 'src/app/app.module';
import { gsapConfigs } from '../global-constants/gsapConfigs'
import { ToggleService } from '../services/animations/toggle.service';

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
  public search :false;
  @Input() data :any;
  constructor(
    private formBulider: FormBuilder,
    @Inject(STATE_SERVICE_TOKEN) private state: StateManagementService,
    private toggle: ToggleService
  ) { }
  ngOnInit(): void {
    this.toDo=this.data.toDo;
    this.appState=this.data.appState;
    this.state.toDoCast$.subscribe((toDo) => {
      this.toDo = toDo;
    });
    this.state.appStateCast$.subscribe((appState) => {
      if(appState&&this.search!=appState.serech){
      this.toggle.execute(appState.serech ,gsapConfigs.searchToDo.tlName);
      }  
      if(this.tempArr&&!this.appState.serech){
        this.state.saveData('toDo',this.tempArr);
        this.state.saveData('tempArr',null);
        this.appState.typing=false;
        this.state.saveData('appState',this.appState);
        this.searchToDoForm.reset();
      }
      this.appState = appState;
      this.search=appState.serech;
    });
    this.state.tempArrCast$.subscribe((tempArr) => {
      this.tempArr = tempArr;
    });
  this.toggle.storeTl((gsapConfigs.searchToDo));
  this.searchToDoForm = this.formBulider.group({
    search: [null]
  })
  }
  type(){
    if(!this.tempArr){
      this.state.saveData('tempArr',this.toDo);
    }
    //let type = this.searchToDoForm.value.search.toLowerCase();
    this.toDo = this.filterByPrefix(this.tempArr,this.searchToDoForm.value.search); 
    // const highlightedLetters = this.getHighlightedLetters(this.toDo, type);
    // this.toDo = this.colorizeLetters(this.toDo, highlightedLetters);
    this.state.saveData('toDo',this.toDo);
    if(!this.appState.typing){
      this.appState.typing=true;
      this.state.saveData('appState',this.appState);
    }
  }
  filterByPrefix(arr: any, prefix: string): any {
    return arr.filter(item => item.name.startsWith(prefix));//add includes dinamically 
  }
// getHighlightedLetters(arr: any, prefix: string): Set<string> {
//   const highlightedLetters = new Set<string>();
//   for (const item of arr) {
//       const name = item.name.toLowerCase();
//       if (name.includes(prefix)) {
//           for (const letter of prefix) {
//               highlightedLetters.add(letter);
//           }
//       }
//   }
//   return highlightedLetters;
// }
// colorizeLetters(arr: any, highlightedLetters: Set<string>): any {
//   return arr.map(item => {
//       const coloredName = item.name
//           .split('')
//           .map(letter => (highlightedLetters.has(letter.toLowerCase()) ? `<span style="color: red">${letter}</span>` : letter))
//           .join('');
//       item.coloredName = coloredName; // Add a new property 'coloredName'
//       return item;
//   });
// }
  ngOnDestroy(): void {
   }
}
