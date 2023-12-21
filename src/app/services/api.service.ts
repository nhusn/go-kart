import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = "http://localhost:3000"
  constructor(private http:HttpClient) {}

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
}
