import { NgModule } from '@angular/core';
import {ListComponent} from './components/list/list.component';
import {CreateComponent} from './components/create/create.component';
import {EditComponent} from './components/edit/edit.component';
import {RemoveComponent} from './components/remove/remove.component';
import {CustomerService} from './services/customer.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BrowserModule} from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '../common/common.module';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    RemoveComponent
  ],
  providers: [
    CustomerService
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatSortModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    ListComponent
  ]
})
export class CustomersModule { }
