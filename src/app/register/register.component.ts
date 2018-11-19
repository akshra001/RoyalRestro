import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm }
  from '@angular/forms';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('profileForm') public createEmployeeForm: NgForm;
  registerForm: FormGroup;
  private registervalue: any;
  private registercheck: any;
  private token: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      firstname: new FormControl('',),
      lastname: new FormControl('',),
    });



  }

  Register(value: any) {
    //  this.usernName= value.username;
    //  this.pass=value.password;
    //  console.log(value);
    this.registervalue = value;
    if (this.registervalue) {
      this.dataservice.saveData(this.registervalue).subscribe((res: any) => {
        this.registercheck = res;
        console.log('Register data', this.registercheck);
        this.token = res.response;
        console.log('Register data', this.token);
        if (this.registercheck.code == 200) {
          alert("registered successfully")
          this.router.navigate(['user']);
        }         
      

    }, (err)=>{
      debugger;
      console.log(err,'Register data');
      if(err.error.code === '409'){
        alert("Already Registered User");
      }
    });
   }
      
    

  }





}