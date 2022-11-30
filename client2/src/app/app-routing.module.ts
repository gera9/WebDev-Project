import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FormUserComponent } from './components/admin/form-user/form-user.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { VarkTestComponent } from './components/vark-test/vark-test.component';
import { PersonalityTestComponent } from './components/personality-test/personality-test.component';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { TestsHomeComponent } from './components/tests-home/tests-home.component';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/usuarios/editar/:id',
    component: FormUserComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'admin/usuarios/agregar',
    component: FormUserComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'admin/admin-user',
    component: AdminUserComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'tests/home',
    component: TestsHomeComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'tests/vark-test',
    component: VarkTestComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'tests/personality-test',
    component: PersonalityTestComponent,
    canActivate: [AccessGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
