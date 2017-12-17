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
    }
    ngOnInit() {
       this.callForData(null);
    }
 
    public callForData(userdata){
      this.loginForm =  new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required)
      });
      this.db.getItemsList().subscribe(response => response)
    }
        
    public storeData(userdata){
        userdata.randomRefNumber = Math.round(Math.random()*100);
        this.db.createItem(userdata)
        sessionStorage.setItem('loggedEmail',userdata.email)
        this.router.navigate(['/dashboard']);
    }
  
    public submitForm({ value, valid }){
      if(valid){
        this.storeData(value);
      }
    }
}
