import { StatusBoardComponent } from './../status-board/status-board.component';
import { DatabaseService } from './../service/database.service';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DashboardComponent } from './dashboard.component';
import { AngularFire } from "angularfire2";
class mockAngularFire{

}

class mockDatabaseSevice{ getUniqueKey(){return 0}}

class mockRouter{ navigate(){}}
fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, StatusBoardComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{provide: Router, useClass:mockRouter}, {provide: DatabaseService, useClass:mockDatabaseSevice}, {provide: AngularFire, useClass:mockAngularFire}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('getUniqueKey()', () => {    
    let a = component.getUniqueKey('');
    expect(a).toEqual(0)
  });

  it('validageUniqueKey', ()=>{
    // case 1;
    component.userRandomNo = undefined;
    component.validageUniqueKey();
    expect(component.errorMessage).toEqual('Please enter valid number');

    // case 2;
    component.userRandomNo = 1;
    component.uniqueKey = 1;
    component.validageUniqueKey();
    expect(component.successMessage).toEqual('Good, you have found');

    // case 3;
    component.userRandomNo = 1;
    component.uniqueKey = 10;
    component.attemptCount = 1;
    component.validageUniqueKey();
    expect(component.errorMessage).toEqual('You have exceeded maximum attempts, you will be logged out 2 sec');

    // case 4;
    component.userRandomNo = 1;
    component.uniqueKey = 10;
    component.attemptCount = 2;
    component.validageUniqueKey();
    expect(component.errorMessage).toEqual('Sorry, you have 1');
    
  })

});
