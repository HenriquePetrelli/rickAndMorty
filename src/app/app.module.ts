import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { SearchFormComponent } from 'src/app/shared/components/search-form/search-form.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CharacterDetailComponent } from './shared/components/character-detail/character-detail.component';
//MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchFormComponent,
    LoadingComponent,
    CharacterDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
  ],
  providers: [SearchFormComponent, CharacterDetailComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
