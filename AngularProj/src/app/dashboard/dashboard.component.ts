import { DatabaseService } from './../service/database.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Item } from "../items";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor( private db : DatabaseService, public afire: AngularFire,  private router: Router) { 
      
  }
  public uniqueKey: number ;
  private loggedEmail: string = '';
  public userRandomNo: number = null;
  public errorMessage: string = '';
  public successMessage: string = '';
  public attemptCount: number = 3;

  ngOnInit() {
    this.loggedEmail  = sessionStorage.getItem('loggedEmail');
      this.getUniqueKey(this.loggedEmail).subscribe((response)=>{
        let res = response.find(function(val){return val.email == sessionStorage.getItem('loggedEmail')});
       this.uniqueKey =  res.randomRefNumber;
    });
  }

  public getUniqueKey(email:string):any{
    return this.db.getUniqueKey(email);
  }  
  
  validageUniqueKey(){
    this.errorMessage = '';
    this.successMessage = '';
    if(this.userRandomNo == undefined || this.userRandomNo == null){
      this.errorMessage =  "Please enter valid number";
    }
    if(this.userRandomNo === this.uniqueKey){
      this.successMessage = "Good, you have found";
    } else {
      this.attemptCount--;
      if(this.attemptCount === 0){
        this.errorMessage = "You have exceeded maximum attempts, you will be logged out 2 sec";
        setTimeout(()=>{
          this.router.navigate(['/forms']);
        }, 2000)
      } else{
        this.errorMessage = "Sorry, you have "+this.attemptCount+" remaining";
      }
    }
    this.userRandomNo = null;
  }

}
