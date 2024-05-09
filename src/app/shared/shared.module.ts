import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
  ], 
  exports: [
    NavBarComponent,
    AboutUsComponent,
    FooterComponent
  ]
})
export class SharedModule { }
