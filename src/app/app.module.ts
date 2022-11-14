import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NormalComicsListComponent } from './features/normal-comics-list/normal-comics-list.component';
import { OwnListComponent } from './features/own-list/own-list.component';
import { RecommendedlistComponent } from './features/recommendedlist/recommendedlist.component';
import { LoginComponent } from './authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComicComponent } from './features/detail-comic/detail-comic.component';
import { RegistrationComponent } from './authentication/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NormalComicsListComponent,
    OwnListComponent,
    RecommendedlistComponent,
    LoginComponent,
    DetailComicComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
