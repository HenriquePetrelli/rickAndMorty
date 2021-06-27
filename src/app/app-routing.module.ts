import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from './shared/components/character-detail/character-detail.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { SearchFormComponent } from './shared/components/search-form/search-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search-form', component: SearchFormComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'character-detail', component: CharacterDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
