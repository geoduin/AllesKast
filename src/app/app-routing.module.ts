import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';
import { StoryDetailComponent } from './features/story/story-detail/story-detail.component';
import { StoryEditComponent } from './features/story/story-edit/story-edit.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Login", component: LoginComponent},
  {path: "Registration", pathMatch: "full" , component: RegistrationComponent},
  {path: "Logout", component: HomeComponent},
  {path: "Home", component: HomeComponent, children:[
    {path: "Story/:UserId/Detail", pathMatch: 'full', component: StoryDetailComponent}
  ]},
  {path: "Story/:UserId/Detail", component: StoryDetailComponent},
  {path: "Story/:UserId/Edit", component: StoryEditComponent},
  {path: "AboutUs", component: AboutMeComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
