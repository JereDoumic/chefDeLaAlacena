import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Recipe, User } from 'src/app/core/Models';import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { JrecipeService } from 'src/app/core/services/jrecipe.service';
import { JsonService } from 'src/app/core/services/json.service';
import { userService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-favorite-recipe',
  templateUrl: './favorite-recipe.component.html',
  styleUrls: ['./favorite-recipe.component.css'],
})
export class FavoriteRecipeComponent implements OnInit {


constructor(private jsonrecipeServer: JrecipeService, private userService: userService, private jsonService: JsonService) {}

 favoriteRecipe: Number[] = [11, 22];
 recipeToShow: Recipe[] = [];
 public users: User[] = [];



  ngOnInit() {
    this.completeData();

    
  }

  async completeData() {
    try {
      this.users = await this.userService.getUsers().then(data => this.users = data);
      for(let item of this.users){
        if(item.id == sessionStorage.getItem("token")){
          this.favoriteRecipe = item.favoriteRecipe;
        }
      }
      this.favoriteRecipeToRecipeToShow();
      
    }
    catch (error){
      console.log(error);
    }
  }


  

  async getRecipeById(id: number){
    try{
      const data = await this.jsonrecipeServer.getRecipeById(id);
      const recipe = Array.isArray(data) ? data[0] : data;
      return recipe;
    }
    catch (error){
      return undefined;
    }
  }

  async favoriteRecipeToRecipeToShow(){
    for(let i = 0; i < this.favoriteRecipe.length; i++){
      try{
        let recipe = await this.getRecipeById(Number(this.favoriteRecipe[i]));
        
        this.recipeToShow.push(recipe);
        
      } catch (error){
        
      }
      
    }
  
  }
  

 


}

