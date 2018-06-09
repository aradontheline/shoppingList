import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ParseService } from '../parse.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  email:string = '';

  constructor(private parseService: ParseService) { }

  ngOnInit() {
  }

  sendEmail(){    
    this.parseService.resetPass(this.email)
      .then(()=>{
        console.log('Reset email was send');
      })
      .catch((error)=>{
        console.log('Error '+ error.message);
      })
  }

}
