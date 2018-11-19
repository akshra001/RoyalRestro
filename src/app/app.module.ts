
import { BrowserModule }from '@angular/platform-browser';
import { NgModule }from '@angular/core';
import { MatButtonModule, MatOptionModule, MatSelectModule, MatCardModule, MatCheckboxModule }from '@angular/material';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
import { MatInputModule }from '@angular/material/input';
import { MatFormFieldModule }from '@angular/material/form-field';

import { HttpClientModule, HTTP_INTERCEPTORS }from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }from '@angular/forms';
import { AppComponent }from './app.component';
import { CartComponent }from './cart/cart.component';
import { AppRoutingModule }from './app-routing.module';
import { HomeComponent }from './home/home.component';
import { UserComponent }from './user/user.component';
import { OrderComponent } from './order/order.component'; 

import { DataService }from './data.service';
import { AuthenticateService } from './authenticate.service';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../_guards/auth.guard';
import { Interceptor} from'../intercepter';
import { OrderHistoryComponent } from './order-history/order-history.component';



@NgModule({

  declarations: [

    AppComponent,

    CartComponent,

    HomeComponent,

    UserComponent,

    RegisterComponent,

    OrderComponent,

    OrderHistoryComponent

  ],

  imports: [

    BrowserModule, HttpClientModule, MatCheckboxModule, MatCardModule,ReactiveFormsModule,

    AppRoutingModule, MatButtonModule, BrowserAnimationsModule, MatInputModule, MatFormFieldModule, FormsModule, MatOptionModule, MatSelectModule

  ],

  providers: [DataService,AuthenticateService,AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true}],

  // providers: [DataService,AuthenticateService,AuthGuard],

  bootstrap: [AppComponent]

})

export class
  AppModule { }

