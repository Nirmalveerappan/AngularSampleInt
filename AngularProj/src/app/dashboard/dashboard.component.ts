import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../service/http.service";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Item } from "../items";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor( private http : HttpService, public afire: AngularFire,  private router: Router) { 
      
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
        return this.http.getUniqueKey(email);
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
              this.router.navigate(['/forms']);
            }, 2000)
          } else{
            this.errorMessage = "Sorry, you have "+this.attemptCount;
          }
        }
        this.userRandomNo = null;
      }


  // private users: Item;
  // private items: FirebaseListObservable<any[]>;
  // private ListofData : any;
  // private countList : any;
  // private newPasswordValue : any;

  //  constructor( private http : HttpService, public afire: AngularFire) { 
  //    this.items = afire.database.list('/Users');
  //    this.http.getItemsList({}).subscribe((response) => {
  //    this.ListofData = response;
  //     this.countList = {};
  //     this.newPasswordValue = {};
  //    for(let m in this.ListofData){
  //      this.countList[this.ListofData[m].username] = 3;
  //    }
  //     }
  //   );
  //   }
  //   ngOnInit() {
  //      //this.callForData(null);
  //   }
  //      public removeItem(u, i){
  //       this.http.deleteItem(u.$key);
  //       console.log("dataList", this.ListofData);
  //      }
  //      public updateItem(u,i){
  //        if(this.newPasswordValue[u.username]!== u.password && this.countList[u.username] > 0){
  //          this.countList[u.username]--;
           
  //        }
  //      }

  //      public saveItem(u,i){
  //        this.isupdateItem = !this.isupdateItem;
  //      }

}
