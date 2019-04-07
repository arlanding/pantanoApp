import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'jugar', loadChildren: './game/game.module#GamePageModule' },
  { path: 'practicar', loadChildren: './questions/questions.module#QuestionsPageModule' },
  { path: 'proximamente', loadChildren: './soon/soon.module#SoonPageModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
