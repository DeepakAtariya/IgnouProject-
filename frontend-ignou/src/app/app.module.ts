import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetupProfileComponent } from '../app/setup-profile/setup-profile.component';
import { SetupProfileService } from '../app/setup-profile/setup-profile.service';
import { Sharing } from 'src/resources/Sharing';
import { LoaderComponent } from './ui/loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';

const appRoutes : Routes = [
  {path : '', component : SetupProfileComponent ,data: {animation: 'HomePage'}},
  {path : 'loader', component : LoaderComponent, },
  {path : 'dashboard', component : DashboardComponent, data: {animation: 'Dashboard'}},
  {path : 'guestdashboard/:program/:enrollment', component : GuestDashboardComponent, data: {animation: 'GuestDashboard'}}
  // {path :'page1', component : HeaderComponent
];

@NgModule({
  declarations: [
    AppComponent,
    SetupProfileComponent,
    LoaderComponent,
    DashboardComponent,
    GuestDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SetupProfileService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
