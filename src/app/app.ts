import { Component, signal } from '@angular/core';
import { apply, email, form, FormField, maxLength, minLength, pattern, required, schema, Schema } from '@angular/forms/signals';

interface LoginData {
  userName: string;
  email: string;
  password: string;
  loginAsAdmin: boolean;
  adminSecret: string;
}

const validators: Schema<string> = schema((fieldPath) => {
  required(fieldPath, {message: 'This field is required.'});
  minLength(fieldPath, 6, {message: 'Must be at least 6 characters long.'});
  maxLength(fieldPath, 20, {message: 'Cannot be more than 20 characters long.'});
})

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormField]
})
export class App {
  protected readonly title = signal('signal-forms-demo');

  protected readonly loginData = signal<LoginData>({
    userName: '',
    email: '',
    password: '',
    loginAsAdmin: false,
    adminSecret: ''
  });

  // protected readonly loginForm = form(this.loginData,(path) => {
  //   required(path.userName, {message: 'Username is required.'});
  //   minLength(path.userName, 3, {message: 'Username must be at least 3 characters long.'});
  //   maxLength(path.userName, 20, {message: 'Username cannot be more than 20 characters long.'});

  //   required(path.email, {message: 'Email is required.'});
  //   email(path.email, {message: 'Please enter a valid email address.'});

  //   required(path.password, {message: 'Password is required.'});
  //   minLength(path.password, 6, {message: 'Password must be at least 6 characters long.'});
  //   maxLength(path.password, 20, {message: 'Password cannot be more than 20 characters long.'});
  //   pattern(path.password,  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //     {message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'}     
  //   )
  // });


    protected readonly loginForm = form(this.loginData,(path) => {
      apply(path.userName,validators)

      required(path.email, {message: 'Email is required.'});
      email(path.email, {message: 'Please enter a valid email address.'});

      apply(path.password,validators);
      pattern(path.password,   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        {message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'}     
      )

      required(path.adminSecret, {
        when: ({valueOf}) => valueOf(path.loginAsAdmin) === true,
        message: 'Admin secret is required when logging in as admin.'
      })
      
  });

  saveLoginForm(){
    event?.preventDefault();
   const formValue = this.loginForm().value(); 
   console.log('Form Value:', formValue);

  }
}
