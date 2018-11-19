import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private length:number;
  private value:any=[];
  private calculatedArray:any=[];

  constructor(private dataService: DataService,private router:Router) { }

  ngOnInit() {
    this.receiveData();
    this.getCart();
  }

  receiveData(){

    this.length=this.dataService.getLength();
    
    // this.dataService.getData().subscribe(data=>{this.data=data});
  }
  OnClick(){
    this.router.navigate(['home']);
  }
  getCart(){
    this.value=this.dataService.getCart(); 
  }
  calculateCart(){
    this.value.forEach(element => {
      this.calculatedArray[element.item_Id]=this.calculatedArray[element.item_Id]=1;
      
    });
  }
}
