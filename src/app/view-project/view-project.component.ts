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
