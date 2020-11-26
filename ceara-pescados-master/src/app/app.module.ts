import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TokenInterceptor } from './auth/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoModule } from './produto/produto.module';
import { TemplateModule } from './template/template.module';
import { CompraModule } from './compra/compra.module';
import { LoginComponent } from './public/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClienteModule } from './cliente/cliente.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TemplateModule,
    ProdutoModule,
    CompraModule,
    ClienteModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
