import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = "http://localhost:3000"

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem('token')){
      this.getWishlistCount()
    }
  }

  getAllProductAPI(){
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  getProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }

  appendTokenToHeaders(){
    let headers = new HttpHeaders
    const token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  // wishlist add 
  addToWishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenToHeaders())
  }

  // wishlist/get-all products
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/wishlist/get-allproducts`,this.appendTokenToHeaders())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  // delete wishlist item
  deleteWishItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenToHeaders())
  }

  // addtocart
  addToCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenToHeaders())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
      console.log(res.length);
      
    })
  }

  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/cart/get-allproduct`,this.appendTokenToHeaders())
  }
}
