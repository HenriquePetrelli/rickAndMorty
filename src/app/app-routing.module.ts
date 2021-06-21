import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { SearchFormComponent } from 'src/app/shared/components/search-form/search-form.component';
import { CharacterDetailComponent } from './shared/components/character-detail/character-detail.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search-form', component: SearchFormComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'character-detail', component: CharacterDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
