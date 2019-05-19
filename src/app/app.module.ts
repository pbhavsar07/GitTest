import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FilterPipe} from './filter.pipe';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersItemComponent } from './users-list/users-item/users-item.component';
import { GitHubService } from './github.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserDetailsComponent } from './user-details/user-details.component'; 
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


const appRoutes: Routes = [
   { path: ':name', component: UserDetailsComponent },
   
];


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    FilterPipe,
    UsersItemComponent,
    UserDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,NgxPaginationModule
  ],
  providers: [GitHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
