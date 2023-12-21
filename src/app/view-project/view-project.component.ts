import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit{

  product:any={}

  constructor(private toaster:ToasterService,private route:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id}=res
      console.log(id);
      // get details of particular product
      this.getProductDetails(id)
    })
  }

  getProductDetails(id:any){
    this.api.getProductAPI(id).subscribe({
      next:(res:any)=>{
        this.product = res
      },
      error:(err)=>{
        console.log(err.error);
      }
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
