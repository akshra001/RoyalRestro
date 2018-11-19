
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { AuthenticateService } from '../authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @ViewChild('profileForm') public createEmployeeForm: NgForm;
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private usernName: string;
  private pass: string;
  private uservalue: string;
  private logincheck: any;
  private token: any;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataservice: DataService,
    private authenticateservice: AuthenticateService) { }

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
  get f() { return this.profileForm.controls; }




  login(value: any) {
    this.uservalue = value;
    if (this.uservalue) {
      debugger
      this.authenticateservice.login(this.uservalue).subscribe((res: any) => {  
        this.logincheck = res;
        console.log(this.logincheck, 'resdata');
        if (this.logincheck) {
          console.log(this.logincheck, 'resdata');
          if (this.logincheck.code == 200) {
            this.router.navigate(['home']);   
          }
        }

      }, (err:any) => {
        debugger;
        console.log(err, 'resdata');
        if (err.error.code === '401') {
          alert("Not Authorized User");
        }
      });
    }
  }

}