import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class DataService implements OnInit {

  constructor(private http: HttpClient) {

  }

  configUrl = 'assets/data.json';
  public cart: any;
  public cartData: any = [];
  public length: number;
  public flag: number = 0;
  public i: number;
  public total: number = 0;
  public msg: string;
  public json: any;
  public cartId: any;
  public orderId: any;
  public saveddata: any;
  public registerdata: any;





  ngOnInit() {
    this.getData();
    this.getCart();
    this.getCoupons();
  }
  getData() {
    return this.http.get("http://ShivaniChaudhry:8083/poc/restaurant").catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    if (error.status == 404) {
      this.msg = "Url is not correct"
    }
    if (error.status == 500) {
      this.msg = "The request was not completed. The server met an unexpected condition."
    }

    return Observable.throw(this.msg || error.message);
  }

  addItem(item): Observable<any> {
    item.username = 'Vishal';
    this.json = JSON.stringify(item);
    console.log(this.json);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post("http://ShivaniChaudhry:8083/poc/cart/add", this.json, httpOptions);
  }
  getCart(): Observable<any> {
    return this.http.get("http://ShivaniChaudhry:8083/poc/cart");
  }

  decreaseQuantity(data) {
    data.quantity = data.quantity - 1;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.cartId = data.cartId;
    this.http.put("http://ShivaniChaudhry:8083/poc/cart/", data, httpOptions).subscribe();

  }

  increaseQuantity(data) {
    data.quantity = data.quantity + 1;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.put("http://ShivaniChaudhry:8083/poc/cart/", data, httpOptions).subscribe();
    
  }
  removeItem(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    let itemIdToDelete:string=data.cartId;
    const url=`http://ShivaniChaudhry:8083/poc/cart/${itemIdToDelete}`;
    debugger
    console.log(url);
    this.http.delete(url,httpOptions).subscribe();
  }



  placeOrders(): Observable<any> {
    this.json = JSON.stringify(this.cart);
    console.log(this.json);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    // this.json+httpParamSerealizer();
    console.log(this.json);
    const username: string = "{\"username\":\"Vishal\"}";
    this.orderId = this.http.post("http://ShivaniChaudhry:8083/poc/order", username, httpOptions);
    return this.orderId;
  }

  sendData(x): Observable<any> {
    // this.saveddata = JSON.stringify(x);
    this.saveddata = x;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    console.log(this.saveddata);
    return this.http.post("http://ShivaniChaudhry:8083/login", this.saveddata, httpOptions);
  }

  saveData(y): Observable<any> {
    // this.saveddata = JSON.stringify(x);
    const payLoad = { firstname: y.firstname, lastname: y.lastname, username: y.username, password: y.password, address: y.address, role: [{ name: 'USER' }] }

    this.registerdata = y;
    //this.registerdata.role="admin";
    console.log(this.registerdata);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    console.log(this.registerdata);
    return this.http.post("http://ShivaniChaudhry:8083/signup", payLoad, httpOptions);
  }
  getCoupons()
  {
    return this.http.get("http://KhushbooJain:8081/coupon");
  }

  applyCoupon(coupon){
    return this.http.get(`http://KhushbooJain:8081/coupon/${coupon}`);
  }
  orderHistory(){

    let payLoad = { username:"Vishal"};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };
    return this.http.get(`http://ShivaniChaudhry:8083/poc/order/users/vishal`);
  }
}



