import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';
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
import { HttpClientModule} from '@angular/common/http';
import { UserDeleteBtnComponent } from './features/user/user-delete-btn/user-delete-btn.component'
import { MaterialElementModules } from 'src/Material.module';
import { UserCardComponent } from './features/user/user-card/user-card.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProfileDropdownComponent } from './shared/side-nav/profile-dropdown/profile-dropdown.component';
import { StoryCardComponent } from './features/story/story-card/story-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    HomeComponent,
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
    UserCardComponent,
    SideNavComponent,
    ProfileDropdownComponent,
    StoryCardComponent,
    
  ],
  imports: [
    MaterialElementModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserDeleteBtnComponent,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [DummyDB],
  bootstrap: [AppComponent]
})
export class AppModule { }
