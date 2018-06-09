import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ParseService } from '../parse.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email:'',
    pass:''
  }

  constructor(private router: Router,private parseService:ParseService) { }

  ngOnInit() {
    console.log('Login page')
    let currrentUser = this.parseService.currentUser();
    if(currrentUser){
      this.router.navigateByUrl('home');
    }
  }

  login(){
    this.parseService.login(this.user)
    .then((user:any)=>{
      console.log(`user ${user.get('username')} logged in`);
      this.router.navigateByUrl('home');
    })
    .catch((error)=>{
      console.log(`Error ${error.message}`);
    })
  }

}
