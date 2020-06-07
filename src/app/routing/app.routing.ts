
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userRoutes } from '../user-module/user.routing';



export const routes: Routes = [
    {
      path: '',
      redirectTo: 'user/signin',
      pathMatch: 'full',
    },
    {
      path: 'user',
      children: userRoutes
    },
    {
      path: 'admin',
      loadChildren: () => import('../admin-module/admin-module.module').then(module => module.AdminModuleModule)
    },
    {
      path: '**',
      redirectTo: 'user/signin'
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
