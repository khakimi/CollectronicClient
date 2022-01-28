import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {authInterceptorProviders} from './helper/auth-interceptor.service';
import {authErrorInterceptorProviders} from './helper/error-interceptor.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserCollectionsComponent } from './user/user-collections/user-collections.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddCollectionComponent } from './user/add-collection/add-collection.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddItemComponent } from './user/add-item/add-item.component';
import { ItemsComponent } from './user/items/items.component';

@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    UserCollectionsComponent,
    EditUserComponent,
    AddCollectionComponent,
    AddItemComponent,
    ItemsComponent
  ],
  imports: [
    NgxDropzoneModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [authInterceptorProviders, authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
