
import {
  Component,
  OnInit
} from
  '@angular/core';

import { NgForm }
  from '@angular/forms';

import { DataService }
  from '../data.service';

import { Router,ActivatedRoute }
  from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';







@Component({

  selector: 'app-admin',

  templateUrl:
    './admin.component.html',

  styleUrls: ['./admin.component.css']

})

export class
  AdminComponent implements OnInit {
    @ViewChild('profileForm') public createEmployeeForm: NgForm;
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    private usernName : string;
    private pass : string;
    private uservalue : string;
    


  constructor(    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  private dataservice : DataService) { }


    ngOnInit() {
      this.profileForm = this.formBuilder.group({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', Validators.required)
      });

// reset login status


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f()
     { return this.profileForm.controls; }


  

     login(value: any)
     {
      //  this.usernName= value.username;
      //  this.pass=value.password;
      //  console.log(value);
       this.uservalue=value;
       if(this.uservalue){
        this.dataservice.sendData(this.uservalue).subscribe((res: any)=>{
          console.log('login data',res);
        });
       }
       
     }
   

  


}