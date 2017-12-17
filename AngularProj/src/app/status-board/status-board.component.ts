import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.css']
})
export class StatusBoardComponent implements OnInit {
  @Input() count: number;
  @Input() status: string;
  @Input() errorMessage: string;
    constructor() { }
  
    ngOnInit() {
  
    }

}
