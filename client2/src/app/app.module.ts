import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ChartGlobalVarkSummaryComponent } from './components/admin/charts/vark/chart-global-vark-summary/chart-global-vark-summary.component';
import { ChartEdiVarkSummaryComponent } from './components/admin/charts/vark/chart-edi-vark-summary/chart-edi-vark-summary.component';
import { ChartFacturaVarkSummaryComponent } from './components/admin/charts/vark/chart-factura-vark-summary/chart-factura-vark-summary.component';

import { ChartFacturaSummaryComponent } from './components/admin/charts/personality/chart-factura-summary/chart-factura-summary.component';
import { ChartEdiSummaryComponent } from './components/admin/charts/personality/chart-edi-summary/chart-edi-summary.component';
import { ChartGlobalSummaryComponent } from './components/admin/charts/personality/chart-global-summary/chart-global-summary.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FormUserComponent } from './components/admin/form-user/form-user.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminUserUpdateComponent } from './components/admin/admin-user-update/admin-user-update.component';
import { AdminUserListComponent } from './components/admin/admin-user-list/admin-user-list.component';
import { VarkTestComponent } from './components/vark-test/vark-test.component';
import { PersonalityTestComponent } from './components/personality-test/personality-test.component';
import { LoginComponent } from './components/public/login/login.component';
import { HomeComponent } from './components/public/home/home.component';
import { PublicHeaderComponent } from './components/public/public-header/public-header.component';
import { TestsHomeComponent } from './components/tests-home/tests-home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartGlobalVarkSummaryComponent,
    ChartEdiVarkSummaryComponent,
    ChartFacturaVarkSummaryComponent,
    ChartFacturaSummaryComponent,
    ChartEdiSummaryComponent,
    ChartGlobalSummaryComponent,
    AdminHomeComponent,
    FormUserComponent,
    AdminHeaderComponent,
    AdminUserComponent,
    AdminUserUpdateComponent,
    AdminUserListComponent,
    VarkTestComponent,
    PersonalityTestComponent,
    LoginComponent,
    HomeComponent,
    PublicHeaderComponent,
    TestsHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
