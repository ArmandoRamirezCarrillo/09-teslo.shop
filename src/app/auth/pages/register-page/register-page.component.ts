import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageAlertComponent } from "../../components/message-alert/message-alert.component";
import { AuthService } from '@auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, MessageAlertComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  hasError = signal(false);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', Validators.required],
  });

  onSubmit(){
    if(this.registerForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '', fullName = '' } = this.registerForm.value;
    this.authService.register(email!, password!, fullName!).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
    })
  }
}
