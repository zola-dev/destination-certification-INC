import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ClTimeoutService {
  constructor() { }
  async execute(data){
    (data.el)[data.task](data.cl[1], data.cl[2]);
  }
}
