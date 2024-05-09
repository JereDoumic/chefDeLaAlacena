import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';	  


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  isLoggedIn = false; 
  @Input() dataInput:any;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  changeRoute(evt: MouseEvent, name: string){
    evt.preventDefault();
    this.router.navigate([name]);
  }

  goLogin(){
    this.router.navigate(['auth']);
  }

  goSearch(){
    this.router.navigate(['search']);
  }

  goNationalRecipes(){
    this.router.navigate(['recetas/nacionales']);
  }

  goFavoriteRecipe(){
    this.router.navigate(['recetas/favorite']);
  }

  
  public goRegister(){
    this.router.navigate(['/auth/register'])
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['landing']);
    sessionStorage.removeItem("token");
  }

}
