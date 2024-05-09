import { Injectable } from '@angular/core';
import { User } from '../Models';
import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null | undefined = null;

  private baseURL = "http://localhost:3000"

  public isLogin: boolean = false;

  constructor(private http: HttpClient) { }


  //*Usuarios
//Verificar usuario 
public getUserToAuth(email:string, password: string): Observable<User[]>{
  return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`);
}


  public async login(email: string, password: string): Promise<boolean> {

    
    try {

      let apiResponse = this.getUserToAuth(email, password);

      let userResponse = await lastValueFrom(apiResponse);

      this.user = userResponse[0]; 

      if (this.user) {
        sessionStorage.setItem('token', this.user.id!.toString());
        this.isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return this.isLogin;
  }

  isLoggedIn(): boolean {
    const userToken = sessionStorage.getItem('token');
    return userToken !== null;
  }
  
  public saveUser(usuario: any): Observable<any> {
    return this.http.post(this.baseURL+ '/users', usuario);
  
}

logout(): void {
  sessionStorage.removeItem('token');
  this.isLogin = false;
  
}



}
