import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { VarkTestComponent } from './components/vark-test/vark-test.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalityTestComponent } from './components/personality-test/personality-test.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

// Guards
import { AccessGuard } from './guards/access.guard';
import { TestsHomeComponent } from './components/tests-home/tests-home.component';

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
    path: 'vark-test',
    component: VarkTestComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'personality-test',
    component: PersonalityTestComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home-admin',
    component: HomeAdminComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'inicio-pruebas',
    component: TestsHomeComponent,
  },
  {
    path: '**',
    redirectTo: '/inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
