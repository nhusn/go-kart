import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit{

  constructor(private toaster:ToasterService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id}=res
      console.log(id);
      // get details of particular product
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
