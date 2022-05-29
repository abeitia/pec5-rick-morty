import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './components/image/image.component';
// import { ImagesComponent } from './components/images/images.component';
import { CharactersComponent} from './components/characters/characters.component';
import { CharacterComponent } from './components/character/character.component';


const routes: Routes = [
{path: '', component:CharactersComponent},
{path: 'character/:id', component:CharacterComponent},
{path: '**', component:CharactersComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
