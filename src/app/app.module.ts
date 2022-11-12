import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FollowBtnComponent } from './features/follow-btn/follow-btn.component';
import { DetailBtnComponent } from './features/detail-btn/detail-btn.component';
import { NormalComicsListComponent } from './features/normal-comics-list/normal-comics-list.component';
import { OwnListComponent } from './features/own-list/own-list.component';
import { RecommendedlistComponent } from './features/recommendedlist/recommendedlist.component';
import { LoginComponent } from './authentication/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FollowBtnComponent,
    DetailBtnComponent,
    NormalComicsListComponent,
    OwnListComponent,
    RecommendedlistComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
