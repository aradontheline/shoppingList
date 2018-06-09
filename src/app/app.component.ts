import { Component } from '@angular/core';
import * as Parse from 'parse';
import {environment} from '../environments/environment';
import {ParseService} from './parse.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login:boolean=false;
  constructor(private parseService:ParseService,private router:Router){
  }

  ngOnInit(){
    let currrentUser = this.parseService.currentUser();
    if(currrentUser){
      this.login = true;
    }
  }

  logout(){
    console.log('loging out');
    this.parseService.logout()
      .then(()=>{        
        this.login = false;
        this.router.navigateByUrl('home')
      })

  }

  
}
