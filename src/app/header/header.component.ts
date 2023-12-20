import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUsername: string = ""

  constructor(private router: Router) { }
  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      this.loginUsername = sessionStorage.getItem('username') || ""
    } else {
      this.loginUsername = ""
    }
  }

  logout() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    this.loginUsername = ""
    this.router.navigateByUrl('')
  }
}
