import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
})
export class StatusBoardComponent  {
  @Input() status: string;
  @Input() errorMessage: string;
    constructor() { }
  

}
