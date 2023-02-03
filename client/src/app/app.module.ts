import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginFrameComponent } from './login-frame/login-frame.component';
import { DataFrameComponent } from './data-frame/data-frame.component';

import { HttpConnectionsService } from './http-connections/http-connections.service';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ScrollUpComponent } from './scroll-up/scroll-up.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginFrameComponent,
    DataFrameComponent,
    ScrollUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [HttpConnectionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
