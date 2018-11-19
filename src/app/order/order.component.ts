import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderId:any;

  constructor(private dataservice : DataService,private router:Router) { }

  ngOnInit() {
    this.order();
  }
order(){
  this.dataservice.placeOrders().subscribe((res: any) => {
    this.orderId=res.response[0].orderId;
    console.log('Order data', res);
  });
}
back(){
  this.router.navigate(['cart']);
}
}
