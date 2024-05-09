import { Component, AfterViewInit } from '@angular/core';


declare var bootstrap: any; 

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {


  ngAfterViewInit() {
    var myCarousel = document.querySelector('#carousel')
    var carousel = new bootstrap.Carousel(myCarousel)
  }

}