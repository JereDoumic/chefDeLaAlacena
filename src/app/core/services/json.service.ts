import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, of } from 'rxjs';
import { User, Recipe, Comment } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private baseURL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }


  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/users`, user);
  }

  public getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseURL}/recipe?id=${id}`);
  }

  public updateTask(user: User): Observable<User> {
    if (!user.id) throw Error("user id is required");

    return this.http.patch<User>(`${this.baseURL}/users/${user.id}`, user);
  }

  

  public deleteUser(id: number): Observable<boolean> {

    return this.http.delete(`${this.baseURL}/users/${id}`)
      .pipe(
        map(resp => true), // 
        catchError(error => of(false)) // 
      );
  }

 
  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseURL}/recipe`);
  }

  public addRecipe(user: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseURL}/recipe`, user);
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    if (!recipe.id) throw Error("recipe id is required");

    return this.http.patch<Recipe>(`${this.baseURL}/recipe/${recipe.id}`, recipe);
  }


  public deleteRecipe(id: number): Observable<boolean> {

    return this.http.delete(`${this.baseURL}/recipe/${id}`)
      .pipe(
        map(resp => true), 
        catchError(error => of(false))
      );
  }

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/comments`);
  }

  public getCommentById(id:number): Observable<String | null> {

    return this.http.get<Comment>(`${this.baseURL}/comments/${id}`).pipe(
      map(comment => comment.text),
      catchError(error => of(null))
    );
  }
  

}

