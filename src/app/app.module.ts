import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { StoryListComponent } from './features/story/story-list/story-list.component';
import { StoryDetailComponent } from './features/story/story-detail/story-detail.component';
import { StoryEditComponent } from './features/story/story-edit/story-edit.component';
import { ChapterListComponent } from './features/story/story-detail/chapter-list/chapter-list.component';
import { ChapterEditComponent } from './features/story/story-detail/chapter-edit/chapter-edit.component';
import { DummyDB } from './services/DummyDb';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserDetailComponent } from './features/user/user-detail/user-detail.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UserDeleteBtnComponent } from './features/user/user-delete-btn/user-delete-btn.component'

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    StoryListComponent,
    StoryDetailComponent,
    StoryEditComponent,
    ChapterListComponent,
    ChapterEditComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserDeleteBtnComponent,
  ],
  providers: [DummyDB],
  bootstrap: [AppComponent]
})
export class AppModule { }
