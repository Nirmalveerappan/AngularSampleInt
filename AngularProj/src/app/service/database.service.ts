import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2";
import { Item } from "../items";
 
@Injectable()
export class DatabaseService {    
  private items: FirebaseListObservable<Item[]> = null;
  private item : FirebaseObjectObservable<Item> = null;
  constructor(private db: AngularFireDatabase) { }
  

public getItemsList(query={}): FirebaseListObservable<Item[]> {
  this.items = this.db.list('/Users', {
    query:  query
  });
  return this.items
}
// Return a single observable item
public getUniqueKey(email: string): FirebaseListObservable<Item[]> {
  this.items = this.db.list('/Users', {
    query:  {"email":email}
  });
  return this.items;
}
 public createItem(item: Item): void  {
   this.items.push(item).catch(error => console.log(error));
  }
  public updateItem(key: string, value : any): void {
   this.items.update(key,value).catch(error=>console.log(error));
}
  public deleteItem( key : string): void {
    this.items.remove(key).catch(error=>console.log(error))
  }


}