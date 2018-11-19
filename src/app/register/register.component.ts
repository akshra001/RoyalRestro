import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router) { }
  

  ngOnInit() {
    
  }



  onSubmit() {
    console.log(this.registerForm.value);
    this.router.navigate(['admin']);
  
  }

}


