import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';



@Injectable()
export class DataService implements OnInit {
  constructor(private http: HttpClient) {

  }

  //configUrl = 'assets/data.json';  (for hardcoded Jsondata)
  public cart: any = [];
  public length: number;
  public saveddata: any;

  ngOnInit() {
    this.getData();
  }
  getData() {
    // return this.http.get(this.configUrl);  (for hardcoded Jsondata)
    return this.http.get("http://shivanichaudhry:8083/restaurant/all");
  }

  addItem(item) {
    this.cart.push(item);
    alert("item added to cart");
    console.log(this.cart);
  }

  getLength() {
    this.length = this.cart.length;
    return this.length;
  }

  getCart() {
    return this.cart;
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
    return this.http.post("http://priyankakashyap:8083/login",this.saveddata, httpOptions);
  }

}
