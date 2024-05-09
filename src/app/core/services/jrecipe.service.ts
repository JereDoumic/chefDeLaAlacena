import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { JsonService } from './json.service';
import { Recipe, Comment } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class JrecipeService {

  constructor(private apiService: JsonService) { }

  public getRecipes(): Promise<Recipe[]> {

    return new Promise<Recipe[]>((resolve, reject) => {

      this.apiService.getRecipes().subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });

  }


  public addRecipe(recipe: Recipe): Promise<Recipe> {

    return new Promise<Recipe>((resolve, reject) => {
      this.apiService.addRecipe(recipe).subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });

  }

  public async updateRecipe(recipe: Recipe): Promise<Recipe | null> {

    let resp: Recipe | null = null;

    try{

      const apiResponse = this.apiService.updateRecipe(recipe);
      resp = await lastValueFrom(apiResponse);

    }catch(error){

      throw error;
    }

    return resp;

  }

  public deleteRecipe(id: number): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      this.apiService.deleteRecipe(id).subscribe({

        next: bool => resolve(bool),
        error: error => reject(error)
      })
    });
  }

  public getComment(): Promise<Comment[]> {

    return new Promise<Comment[]>((resolve, reject) => {

      this.apiService.getComments().subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });

  }

  public getRecipeById(id: number): Promise<Recipe> {

    return new Promise<Recipe>((resolve, reject) => {

      this.apiService.getRecipeById(id).subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });

  }
}