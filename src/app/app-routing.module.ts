import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./module/login/login.module').then(log => log.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./module/home/home.module').then(home => home.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./module/admin/admin.module').then(admin => admin.AdminModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppModuleRoutingModule { }
