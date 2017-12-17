import { LoginComponent } from './login/login.component';
import { DatabaseService } from './service/database.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";
import { routeValues } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule,
    RouterModule.forRoot(routeValues),
    FormsModule 
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
