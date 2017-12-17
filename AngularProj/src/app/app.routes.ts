
import { Routes , ActivatedRoute, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


export const routeValues: Routes =  [
{
    path : '',
    redirectTo: '/login',
    pathMatch: 'full'
},
{
    path : 'login',
    component : LoginComponent
},
{
    path : 'dashboard',
    component : DashboardComponent
},
{
    path: '**', 
    component : LoginComponent
}

]