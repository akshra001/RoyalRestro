import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public length: number;
  public cart: any = [];
  public calculatedArray: any = [];
  public total: number;
  public orderId: any;
  public coupons: any;
  public is_edit: boolean;
  public coupon_success: string;
  // public function is_disabled(data:any):boolean{
  //   return data
  // };

  constructor(private dataService: DataService, private router: Router, private http: HttpClient) {
    this.is_edit = false;
  }

  ngOnInit() {
    this.total = 0;
    this.getCart();
    this.getCoupons();
  }


  getCart() {
    this.dataService.getCart().subscribe(data => {
      this.cart = data['response'];
      console.log(this.cart);
      this.length = this.cart.length;
      for (let i = 0; i < this.length; i++) {
        this.total = this.total + this.cart[i].totalPrice;
      }
    });
  }

  decreaseQuantity(data) {
    this.dataService.decreaseQuantity(data);
    this.ngOnInit();
  }

  increaseQuantity(data) {
    this.dataService.increaseQuantity(data);
    this.ngOnInit();

  }
  removeItem(data) {
    this.dataService.removeItem(data);

  }
  placeOrder() {
    // this.dataService.placeOrders().subscribe((res: any) => {
    //   console.log('Order data', res);
    // }); 
    this.router.navigate(['order']);
  }
  getCoupons() {
    this.dataService.getCoupons().subscribe(data => {
      this.coupons = data["response"];
      console.log(this.coupons);
    }
    );
  }
  onClick() {
    this.router.navigate(['home']);
  }

  removeCoupon() {
    this.ngOnInit();
    this.coupon_success = " ";
    this.is_edit = false;


  }
  onSubmit(value: any) {
    let coupon = value.coupon;
    console.log(coupon);
    // this.dataService.applyCoupon(coupon); 
    const url = `http://KhushbooJain:8081/coupon/${coupon}/${this.total}`;
    this.http.get(url).subscribe(data => {
      console.log(data);
      if (data["statusCode"] == 200) {
        debugger
        console.log(data["response"]);
        this.total = data["response"];
        this.is_edit = true;
        this.coupon_success = "Applied Successfully";
      }
      // if(data["statusCode"]==404){
      //   debugger
      //   console.log(data["response"]);
      //   this.total=data["response"];
      //   this.is_edit=true;
      //   this.coupon_success="Not Applicable";
      // }
    }, (err: any) => {
      console.log(err, 'resdata');
      if (err.error.statusCode == 404) {
        this.coupon_success = "Not Applicable";
      }
    });
  }

}
