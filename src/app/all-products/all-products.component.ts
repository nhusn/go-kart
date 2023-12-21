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
      console.log(this.allProducts);
      
    })
  }

  addtoWishlist(products:any){
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistAPI(products).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess('product added succesfully');
          this.api.getWishlistCount()
        },
        error:(err)=>{
          this.toaster.showWarning(err.error)
          console.log(err);
        }
      })
    }else{
      this.toaster.showWarning('Please login');
    }
  }

  addtoCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
          this.api.getCartCount()
        },
        error:(err)=>{
          console.log(err);
          this.toaster.showWarning(err.error)
        }
      })
    }else{
      this.toaster.showWarning('Please login');
      
    }
  }


}
