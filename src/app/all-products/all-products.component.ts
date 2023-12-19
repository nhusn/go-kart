import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  allProducts:any=[]
  constructor(private api:ApiService, private toaster:ToasterService){}

  ngOnInit(): void {
    this.api.getAllProductAPI().subscribe((res:any)=>{
      this.allProducts = res
    })
  }

  addtoWishlist(products:any){
    if(sessionStorage.getItem("token")){
      this.toaster.showSuccess('proceed to login');
    }else{
      this.toaster.showWarning('Please login');
      
    }
  }

  addtoCart(products:any){
    if(sessionStorage.getItem("token")){
      this.toaster.showSuccess('proceed to login');
    }else{
      this.toaster.showWarning('Please login');
      
    }
  }

}
