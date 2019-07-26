import 'reflect-metadata';
import '../polyfills';
import 'hammerjs'; 


import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { NguiAutoCompleteModule } from '@ngui/auto-complete'; 
import {TableModule} from 'ngx-easy-table'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { DashComponent } from './dash/dash';
import { HomeComponents } from './home/home';
import { Add_product } from './product/add_product';
import { Update_product } from './product/update';

import { Bill_b2b } from './bill/new/main';
import { ReturnComponent } from './return/main';
import { Invoiceall_b2b } from './bill/view/b2b/main';
import { Invoiceall_b2c } from './bill/view/b2c/main';


import { Tax_manageComponent } from './admin/manage_tax/main';
import { Customer_Component } from './admin/customer/main';

import { Greeting_Component } from './admin/greeting/main';
import { Admin_Invoice_string_mainComponent } from './admin/prefix/main';
import { BackupComponents } from './admin/backup/main';


import { MainReportComponent } from './reports/main/main';
import { Revenue_report } from './reports/revenue/main';
import { Expense_report } from './reports/expense/main';
import { Purchase_report } from './reports/purchase/main';
import  { SalesReport } from './reports/sales/main';
import { Customer_statement } from './reports/customer/main';
import  { Auditor_statement } from './reports/auditor/auditor';
import  { Customer_cr_deb_statement} from './reports/cus-cr-deb/main';
import { ListStock_details } from './reports/stock_detailed/main';




import { LicenceComponents } from './licence/main';







import { Expence_main } from './expence/main';
import  { Expence_main_details } from './admin/purchase_all/detail_view/main';
import { Purchase_main } from './purchase/main';
import { Purchase_all } from './admin/purchase_all/view/main';



import { B2b_top_Component } from './component/bill_top_entry/b2b/b2b';
import { Sub_total_Component } from './component/bill_sub_total/sub_total';
import { Bill_pay_balance_Component } from './component/bill_pay_and_bal/main';



import { ListStock } from './reports/stock/main';
import { PaymentComponents } from './admin/cash_intake/main';
import { PaymentComponentsonbills } from './admin/cash_on_bill/main';


import { AuthGuard } from './services/auth.guard';
import { User_role } from './services/user_role';
import { DataService } from './services/data.service';
import { UpdateService } from './services/update.service';
import { AuthenticationService } from './services/login.service';
import { SharingService } from './services/sharing.service';
import { ReportService }  from './services/report.service';
import { ExcelService } from './services/excel.service';



import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {A11yModule} from '@angular/cdk/a11y';
import {
  
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

@NgModule({
  imports:      [ BrowserModule,NguiAutoCompleteModule,
  FormsModule,BrowserAnimationsModule,HttpModule,
  AppRoutingModule,HttpClientModule,ReactiveFormsModule,
    MatAutocompleteModule, A11yModule,
    CdkTableModule,
    ScrollingModule,
    CdkTreeModule,
    DragDropModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,TableModule ],
  declarations: [ AppComponent, LoginComponent,DashComponent,HomeComponents,Customer_Component,Update_product,MainReportComponent,
  ListStock_details,
    Expence_main,ListStock,  Expense_report,SalesReport,PaymentComponents,PaymentComponentsonbills,Customer_statement,Expence_main_details,
    Admin_Invoice_string_mainComponent,Customer_cr_deb_statement,LicenceComponents,Purchase_main,Purchase_all,
  Bill_b2b,Greeting_Component,B2b_top_Component,Invoiceall_b2b,Invoiceall_b2c,BackupComponents,ReturnComponent,Auditor_statement,
    Sub_total_Component,Bill_pay_balance_Component,Tax_manageComponent,Add_product,Revenue_report,Purchase_report ],
   providers: [AuthenticationService,AuthGuard,DataService,UpdateService,SharingService,ReportService,User_role,ExcelService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
