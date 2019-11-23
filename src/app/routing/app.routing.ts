
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



export const routes: Routes = [
    {
      path: '',
      redirectTo: 'user',
      pathMatch: 'full',
    },
    {
      path: 'user',
      loadChildren: () => import('../user-module/user-module.module').then(module => module.UserModule)
    }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
