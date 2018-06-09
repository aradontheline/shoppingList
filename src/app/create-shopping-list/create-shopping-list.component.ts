import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ParseService} from '../parse.service';

@Component({
  selector: 'app-create-shopping-list',
  templateUrl: './create-shopping-list.component.html',
  styleUrls: ['./create-shopping-list.component.css']
})
export class CreateShoppingListComponent implements OnInit {

  shoppingList:string;

  constructor(private parseService:ParseService, private router:Router) { }

  ngOnInit() {
    let user = this.parseService.currentUser();
    if(!user){
      this.router.navigateByUrl('login');
    }
  }

  createShoppingList(){
    console.log('creating shopping list');
    this.parseService.createShoppingList(this.shoppingList).then((list:any)=>{
      console.log('list saved :',list.get('name'));
      this.shoppingList = '';
    }).catch(error=>{
      console.log(error.message)
    })
  }

}
