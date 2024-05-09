import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  ngOnInit(): void {
  
  }

  constructor(private router: Router){

  }

  goRegister(){
    this.router.navigate(['auth/register']);
  }
}
