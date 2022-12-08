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
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserDetailComponent } from './features/user/user-detail/user-detail.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserDeleteBtnComponent } from './features/user/user-delete-btn/user-delete-btn.component';
import { UserCardComponent } from './features/user/user-card/user-card.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProfileDropdownComponent } from './shared/side-nav/profile-dropdown/profile-dropdown.component';
import { StoryCardComponent } from './features/story/story-card/story-card.component';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';
import { DummyRepo } from './../../../../libs/services/src/lib/Dummy/DummyRepo';
import { StoryBtnComponent } from './features/story/story-btn/story-btn.component';
import {
  AuthService,
  ConfigModule,
  StoryClient,
  UserClient,
} from '../../../../libs/services/src';
import { environment } from '../environments/environment';
import { UiModule } from '../../../../libs/ui/src';
import { HttpInterceptors } from './interceptors/HttpInterceptors';
import { DetailComponent } from './features/chapters/detail/detail.component';
import { ChapterDeleteComponent } from './features/chapters/chapter-delete/chapter-delete.component';
import { ChapterViewComponent } from './features/chapters/chapter-view/chapter-view.component';
import { ChapterEditComponent } from './features/chapters/chapter-edit/chapter-edit.component';
import { ChapterListComponent } from './features/chapters/chapter-list/chapter-list.component';
import { CommentEditComponent } from './features/comments/comment-edit/comment-edit.component';
import { CommentDeleteComponent } from './features/comments/comment-delete/comment-delete.component';
import { CommentCardComponent } from './features/comments/comment-card/comment-card.component';
import { CommentListComponent } from './features/comments/comment-list/comment-list.component';
import { ProfileComponent } from './features/profile/profile.component';
import { WrittenlistComponent } from './features/profile/writtenlist/writtenlist.component';
import { WarningSignComponent } from './shared/warning-sign/warning-sign.component';
import { AuthenticationGuard } from './authGuards/authGuard';
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
    BackBtnComponent,
    StoryBtnComponent,
    DetailComponent,
    ChapterDeleteComponent,
    ChapterViewComponent,
    CommentEditComponent,
    CommentDeleteComponent,
    CommentCardComponent,
    CommentListComponent,
    ProfileComponent,
    WrittenlistComponent,
    WarningSignComponent,
    UserDeleteBtnComponent,
  ],
  imports: [
    UiModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfigModule.ForRoot({ apiEndpoint: environment.NestJSUrl }),
    LayoutModule,
  ],
  providers: [
    DummyRepo,
    AuthenticationGuard,
    AuthService,
    UserClient,
    StoryClient,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
//
