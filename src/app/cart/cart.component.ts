import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartTotalPrice :number = 0
  cartItems:any = []
  constructor(private api:ApiService){}
  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.getcart()
    }else{
      this.cartItems()
    }
  }

  getcart(){
    this.api.getCartAPI().subscribe((res:any)=>{
      this.cartItems=res
      this.getCartTotalPrice()
    })
  }

  getCartTotalPrice(){
    if(this.cartItems.length>0){
      let total = 0
      this.cartItems.forEach((product:any)=>{
        total += product.grandTotal
      })
      this.cartTotalPrice = Math.ceil(total)
      
    }
  }

  incrementCart(id:any){
    this.api.cartIncrementAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.api.getCartCount()
      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  decrementCart(id:any){
    this.api.cartDecrementAPI(id).subscribe({
      next:(res:any)=>{
        this.getcart()
        this.api.getCartCount()
      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:any){
    this.api.removeCartItemAPI(id).subscribe((res:any)=>{
      this.getcart()
      this.api.getCartCount()
    })
  }

  emptyCart(){
    this.api.emptyCartItemAPI().subscribe((res:any)=>{
      this.getcart()
      this.api.getCartCount()
    })
  }

  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.cartTotalPrice))
  }
}
