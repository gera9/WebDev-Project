import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VarkTestComponent } from './components/vark-test/vark-test.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalityTestComponent } from './components/personality-test/personality-test.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { TestsSettingsComponent } from './components/tests-settings/tests-settings.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { TestsHomeComponent } from './components/tests-home/tests-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    VarkTestComponent,
    LoginComponent,
    PersonalityTestComponent,
    HomeAdminComponent,
    TestsSettingsComponent,
    AdminFormComponent,
    TestsHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
