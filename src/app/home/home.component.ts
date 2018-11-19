import { Component, OnInit } from '@angular/core';
import { DataService } from '.././data.service';
import { AuthenticateService } from '../authenticate.service';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private data;
  // private length: number;
  private tableData: any = [];
  private cart: any = [];

  constructor(private dataService: DataService, private authService: AuthenticateService,private appcomponent:AppComponent) { }

  ngOnInit() {
    this.receiveData();
    // this.getCart();
  }
  receiveData() {
    this.dataService.getData().subscribe(data => {
      this.tableData = data.response;
    });
  }
  // getCart() {
  //   this.dataService.getCart().subscribe(data => {
  //     this.cart = data['response'];
  //     this.length = this.cart.length;
  //   })
  // }

  itemSelected(item) {
    this.dataService.addItem(item).subscribe((res: any) => {
      if (res.response == "ITEM ALREADY EXISTS IN CART !!!!") {
        alert("ITEM ALREADY EXISTS IN CART !!!!");
      }
      console.log('cart data', res);
    });
    // this.ngOnInit();
    // this.getCart();
    this.appcomponent.getCart();
    
  }

  logout(){
    this.authService.logout();
  }
}
