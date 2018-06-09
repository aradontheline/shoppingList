import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ParseService} from '../parse.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists:any[] = [];

  constructor(private router:Router,private parseService : ParseService) { }

  ngOnInit() {
    let user = this.parseService.currentUser();
    if(!user){
      this.router.navigateByUrl('login');
    }
    this.fetchShoppingLists();
  }

  fetchShoppingLists(){
    console.log('fetching shopping lists');
    this.parseService.fetchShoppingLists().then((lists:any)=>{
      this.lists = lists.map(list=>{
        return {name:list.get('name'),id:list.id}
      })
    })
  }

}
