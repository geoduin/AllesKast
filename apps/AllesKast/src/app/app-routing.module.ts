import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { ChapterEditComponent } from './features/chapters/chapter-edit/chapter-edit.component';
import { ChapterViewComponent } from './features/chapters/chapter-view/chapter-view.component';
import { DetailComponent } from './features/chapters/detail/detail.component';
import { HomeComponent } from './features/home/home.component';
import { StoryDetailComponent } from './features/story/story-detail/story-detail.component';
import { StoryEditComponent } from './features/story/story-edit/story-edit.component';
import { StoryListComponent } from './features/story/story-list/story-list.component';
import { UserDetailComponent } from './features/user/user-detail/user-detail.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { UserListComponent } from './features/user/user-list/user-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Login", component: LoginComponent},
  {path: "Registration", pathMatch: "full" , component: RegistrationComponent},
  {path: "Logout", component: HomeComponent},
  {path: "Users", component: UserListComponent}, 
  {path:"Users/:UserId", component: UserDetailComponent},
  {path:"Users/:UserId/Edit", component: UserEditComponent}
  ,
  {path: "Home", component: HomeComponent, children:[
    {path: "Story/:StoryId/Detail", pathMatch: 'full', component: StoryDetailComponent},
    {path:"Users/:UserId", component: UserDetailComponent},
  ]},
  {path: "Story", component: StoryListComponent}
  ,
  {path: "Story/:StoryId/Chapter/Add", component: ChapterEditComponent},
  {path: "Story/:StoryId/Chapter/:ChapterId/Edit", component: ChapterEditComponent},
  {path: "Story/:StoryId/Chapter/:ChapterId/Read", component: ChapterViewComponent, children: [
    {path: ":ChapterId", component: DetailComponent}
  ]},
  {path: "Story/Add", providers: [], component: StoryEditComponent},
  {path: "Story/:StoryId", component: StoryDetailComponent, children: [
    {path: "Chapter/Add", component: ChapterEditComponent},
    {path: "Chapter/:ChapterId/Edit", component: ChapterEditComponent},
    {path: "Chapter/:ChapterId/read", component: ChapterViewComponent}
  ]},
  {path: "Story/:StoryId/Edit", component: StoryEditComponent},
  {path: "AboutUs", component: AboutMeComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
