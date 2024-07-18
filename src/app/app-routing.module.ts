import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
