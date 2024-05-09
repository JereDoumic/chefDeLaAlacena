import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../Models';
import { JsonService } from './json.service';

@Injectable({
  providedIn: 'root'
})
export class userService {

  constructor(private apiService: JsonService) { }

  public getUsers(): Promise<User[]> {

    return new Promise<User[]>((resolve, reject) => {

      this.apiService.getUsers().subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });

  }
  


  public addUser(user: User): Promise<User> {

    return new Promise<User>((resolve, reject) => {
      this.apiService.addUser(user).subscribe({

        next: data => resolve(data),
        error: error => reject(error)
      })
    });

  }

  public async updateUser(user: User): Promise<User | null> {

    let resp: User | null = null;

    try{

      const apiResponse = this.apiService.updateTask(user);
      resp = await lastValueFrom(apiResponse);

    }catch(error){

      throw error;
    }

    return resp;

  }

  public deleteUser(id: number): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      this.apiService.deleteUser(id).subscribe({

        next: bool => resolve(bool),
        error: error => reject(error)
      })
    });
  }







}