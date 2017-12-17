import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Router } from '@angular/router';
import { DatabaseService } from "../service/database.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None 
})
export class LoginComponent implements OnInit {

 private userDetails : FirebaseListObservable<any[]>; ;
  private loginForm : FormGroup;
  items: FirebaseListObservable<any[]>;

    constructor( private db : DatabaseService, public afire: AngularFire, public router: Router) { 
     this.items = afire.database.list('/Users');
     this.items.subscribe((response => console.log(response)))
    }
    ngOnInit() {
       this.callForData(null);
    }
 
    public callForData(userdata){
     
            this.loginForm =  new FormGroup({
              username: new FormControl("", Validators.required),
              email: new FormControl("", [Validators.required, Validators.email]),
          });
        }
    
        public checkData(data){
          this.items = this.db.getItemsList({});
          if(true){
            
            this.router.navigate(['/dashboard']);
          }
        }
   
    public submitForm({ value, valid }){
      console.log(value);
     
      if(valid){
       this.checkData(value);
      }
    }

}
