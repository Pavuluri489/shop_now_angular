import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  customer: any;
constructor(
  private authService:AuthService
){}

  ngOnInit(): void {
    this.customer=this.authService.getCustomer();
  }

}
