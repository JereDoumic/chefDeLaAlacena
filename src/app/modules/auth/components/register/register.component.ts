import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { userService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit{

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public userReg: User = new User({});
  users: Array<User> = [];
  userForm: FormGroup;

  constructor(private userService: userService, private formB: FormBuilder, public apiService:
                              ApiService, private authService: AuthService,private router: Router, private toastr: ToastrService){
      this.userForm = this.formB.group({
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      });
     }
  
  ngOnInit(): void {
    this.getUsers();
    
   }


   @Output() public onNewUser: EventEmitter<User>= new EventEmitter();

   getUsers(){
    this.userService.getUsers().then(data => this.users = data);
   }
  
  
 
  public onSubmit() {
    console.log(this.userForm);
    this.userReg.id = this.getLastId();
    this.userReg.userName = this.userForm.value.userName;
    this.userReg.email = this.userForm.value.email;
    this.userReg.password = this.userForm.value.password;
    this.emitCharacter();
    this.authService.saveUser(this.userReg).subscribe(response=> {
    this.userForm.reset();
    this.toastr.success("Usuario Registrado con éxito", "Registro exitoso");
    this.router.navigate(['auth/login']);

   },error =>{
    console.log('error');
   } )
   
  }

  isValidField(field:string): boolean | null{
    return this.userForm.controls[field].errors && this.userForm.controls[field].touched;
  }

  getErrorInField(field:string): string | null {
    
    if(!this.userForm.controls[field]) return null; //verifica que el campo exista

    const errors= this.userForm.controls[field].errors || {}; //o llena con los errores o lo inicia con obj vacío
   
    for(const key of Object.keys(errors)){ //reacciono a cada error de los input recorriendo el arreglo por cada key
      switch(key){
        case 'required':
          return "Debe completar este campo";
        case 'minlength':
            return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
            return `Maximo ${errors['maxlength'].requiredLength} caracteres `;
        case 'pattern':
          return 'Formato de email invalido'
      }
    }
    return null;
  }

  private getLastId(){
    
    let lastId = 1;
    for(let item of this.users){
      lastId++;
    }
    return lastId;
  }



  public emitCharacter() {
  this.onNewUser.emit(this.userReg);
  }          

}