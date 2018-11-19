import { Component } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { DataService} from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  private cart: any = [];
  private length: number;
  constructor(private dataService: DataService,private authService: AuthenticateService) { }

  ngOnInit() {
    this.getCart();
  }
  getCart() {
    this.dataService.getCart().subscribe(data => {
      this.cart = data['response'];
      this.length = this.cart.length;
    })
  }
  logout(){
    this.authService.logout();
  }
}
