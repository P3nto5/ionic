
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  AuthProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'login',
    actionChanger: 'Create account'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private authService: AuthService, private fb: FormBuilder, private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sing up';
    this.configs.actionChanger = isSignIn ? 'Create account' : 'Alredy have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

    async onSubmit(provider: AuthProvider): Promise<void> {
      const loading = await this.overlayService.loading();
      try {
        const credentials = await this.authService.authenticate({
          isSignIn: this.configs.isSignIn,
          user: this.authForm.value,
          provider
        });

        console.log('authenticated: ', credentials);
        console.log('redirection...');
      } catch (e) {
        console.log('Auth error: ', e);
        await this.overlayService.toast({
          message: e.message
        });
      } finally {
        loading.dismiss();
      }
  }

}
