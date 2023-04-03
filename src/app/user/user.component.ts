import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
customer:any;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.customer=this.authService.getCustomer();
  }

}
