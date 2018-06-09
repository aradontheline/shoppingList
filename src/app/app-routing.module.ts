import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CreateShoppingListComponent } from './create-shopping-list/create-shopping-list.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';

const routes:Routes = [
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'forgot-pass',component:ForgotPassComponent},
  {path:'create-shopping-list',component:CreateShoppingListComponent},
  {path:'shopping-list-details/:id',component:ShoppingListDetailsComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
