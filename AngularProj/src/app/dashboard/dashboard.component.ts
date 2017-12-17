import { DatabaseService } from './../database.service';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Item } from "../items";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor( private db : DatabaseService, public afire: AngularFire,  private router: Router) { 
      
      }
      private uniqueKey: number ;
      private loggedEmail: string = '';
      public userRandomNo: number = null;
      public errorMessage: string = '';
      public successMessage: string = '';
      public attemptCount: number = 3;
      ngOnInit() {
            this.loggedEmail  = sessionStorage.getItem('loggedEmail');
            console.log(this.loggedEmail)
             this.uniqueKey = this.getUniqueKey(this.loggedEmail);
             console.log(this.uniqueKey)
          }

      public getUniqueKey(email:string):number{
        return this.db.getUniqueKey(email);
      }  
      
      validageUniqueKey(){
        console.log('clicked');
        if(this.userRandomNo == undefined || this.userRandomNo == null){
          this.errorMessage =  "Please enter valid number";
        }
        if(this.userRandomNo === this.uniqueKey){
          console.log("done");
          this.successMessage = "Good, you have found";
        } else {
          this.attemptCount--;
          if(this.attemptCount === 0){
            this.errorMessage = "You have exceeded maximum attempts, you will be logged out 2 sec";
            setTimeout(()=>{
              this.router.navigate(['/login']);
            }, 2000)
          } else{
            this.errorMessage = "Sorry, you have "+this.attemptCount;
          }
        }
        this.userRandomNo = null;
      }


 }
