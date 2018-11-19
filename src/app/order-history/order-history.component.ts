import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  private tableData: any=[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.orderHistory();
  } 

  orderHistory() {
    this.dataService.orderHistory().subscribe(data => {
      this.tableData = data["response"];
      console.log(this.tableData);
    });


  }
}
