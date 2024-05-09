import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel.component';




@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CarouselComponent
  ]
})
export class CarouselModule { }
