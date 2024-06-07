import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements  OnInit{
  constructor(private router: Router){}

  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      
    } else if (role == undefined || role == null) {
      this.router.navigateByUrl('/auth/login');
    }
  }
}

