import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {IndexComponent} from './layout/index/index.component';
import {AuthGuardService} from './helper/auth-guard.service';
import {ProfileComponent} from './user/profile/profile.component';
import {UserCollectionsComponent} from './user/user-collections/user-collections.component';
import {AddCollectionComponent} from './user/add-collection/add-collection.component';
import {ItemsComponent} from './user/items/items.component';
import {any} from 'codelyzer/util/function';
import {UserCollectionService} from './service/userCollection.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: UserCollectionsComponent, canActivate: [AuthGuardService]},
      {path: 'add', component: AddCollectionComponent, canActivate: [AuthGuardService]},
      { path: ':id', component: ItemsComponent }
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
