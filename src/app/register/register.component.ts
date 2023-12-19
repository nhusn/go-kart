import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loginImage:string='./assets/login.png'

  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],
  })

  constructor(private fb:FormBuilder, private toaster:ToasterService, private api:ApiService,private router:Router){}

  register(){    
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = {username,email,password}
      
      this.api.registerAPI(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          
          this.toaster.showSuccess(`${res.username} registered succesfully`)
          this.registerForm.reset()
          this.router.navigateByUrl('/user/login') 
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)          
          this.registerForm.reset()
        }
      }) 
    }else{
      this.toaster.showWarning('Invalid Input')
    }
       
  }
}
