import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';


import { HeaderComponent } from './header/header.component';
import { Header2Component } from './header2/header2.component';
import { ItemListComponent } from './item-list/item-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ItemPromocionComponent } from './item-promocion/item-promocion.component';

import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './registro-login/login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LocalesComponent } from './locales/locales.component';
import { MisionComponent } from './mision/mision.component';

import { RegistroComponent } from './registro-login/registro/registro.component';
import { RegistroLoginComponent } from './registro-login/registro-login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component'

import { AccountInfoComponent } from './account-info/account-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { UsuarioServicio } from './usuario.service';

@NgModule({
  declarations: [
    AppComponent,
  
    HeaderComponent,
    ItemComponent,
    Header2Component,
    ItemListComponent,
    FooterComponent,
    ItemPromocionComponent,
    CartComponent,
    AccountInfoComponent,
    LoginComponent,
    NosotrosComponent,
    LocalesComponent,
    MisionComponent,
    RegistroLoginComponent,
    RegistroComponent,
    CartItemComponent,
 
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],

  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [UsuarioServicio, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
