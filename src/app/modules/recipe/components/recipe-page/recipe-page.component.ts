import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit{

  data: any[] = [];

  constructor(private apiService: ApiService){

  }

  ngOnInit(): void {
    this.completeData();
  }

  

  completeData(){
    for(let i = 1; i < 8; i++){
      try{
        this.apiService.getRecipeById(i).subscribe(
          data => {
            this.data.push(data);
            
          }
        )
      } catch (error) {
        console.log(error);
      }
    }
  }

}
