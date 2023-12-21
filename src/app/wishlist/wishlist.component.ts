import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allWishlistProducts:any =[]
  
  constructor(private api:ApiService, private toaster:ToasterService){}

  ngOnInit(): void {
    this.getAllWishlistProducts()
  }

  getAllWishlistProducts(){
    this.api.getWishlistAPI().subscribe((res:any)=>{
      this.allWishlistProducts = res
      this.api.getWishlistCount()
    })
  }

  removeItem(id:any){
    this.api.deleteWishItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getAllWishlistProducts()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addtoCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
          this.api.getCartCount()
          this.removeItem(product._id)
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
