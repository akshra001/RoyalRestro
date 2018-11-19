import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent} from './home/home.component';
import { UserComponent }from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../_guards/auth.guard';
import { OrderComponent} from './order/order.component';
import { OrderHistoryComponent} from './order-history/order-history.component'



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
    // path: 'home', component: HomeComponent

  },

  {
    path: 'register', component: RegisterComponent

  },
  {
    path: 'cart', component: CartComponent, canActivate: [AuthGuard]
    // path: 'cart', component: CartComponent

  },
  {
    path: 'user', component: UserComponent

  }
  ,
  {
    path: 'order', component: OrderComponent, canActivate: [AuthGuard]
    // path: 'order', component: OrderComponent

  },
  {
    path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard]
    // path: 'order', component: OrderComponent

  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
