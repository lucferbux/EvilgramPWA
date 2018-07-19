import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './routing-components/login-screen/login-screen.component';
import { FeedEvilgramComponent } from './routing-components/feed-evilgram/feed-evilgram.component';
import { AuthGuard } from './core/auth.guard';
import { ImageCreatorComponent } from './routing-components/image-creator/image-creator.component';

const routes: Routes = [
  {path: 'login', component: LoginScreenComponent},
  {path: 'feed', component: FeedEvilgramComponent, canActivate: [AuthGuard]},
  {path: 'upload', component: ImageCreatorComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'feed', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
