

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { User_role } from './services/user_role';
import { DashComponent } from './dash/dash';
import { HomeComponents } from './home/home';
import { LoginComponent } from './login/login';
import { Bill_b2b } from './bill/new/main';
import { Greeting_Component } from './admin/greeting/main';
import { Tax_manageComponent } from './admin/manage_tax/main';
import { Add_product } from './product/add_product';
import { Invoiceall_b2b } from './bill/view/b2b/main';
import { Invoiceall_b2c } from './bill/view/b2c/main';


import { Customer_Component } from './admin/customer/main';
import { Update_product } from './product/update';
import { MainReportComponent } from './reports/main/main';
import { Expence_main } from './expence/main';
import { ListStock } from './reports/stock/main';
import { Revenue_report } from './reports/revenue/main';
import { Purchase_report } from './reports/purchase/main';
import { Expense_report } from './reports/expense/main';
import  { SalesReport } from './reports/sales/main';
import { PaymentComponents } from './admin/cash_intake/main';
import { Customer_statement } from './reports/customer/main';
import { Admin_Invoice_string_mainComponent } from './admin/prefix/main';
import { BackupComponents } from './admin/backup/main';
import { ReturnComponent } from './return/main';
import  { Auditor_statement } from './reports/auditor/auditor';
import  { Customer_cr_deb_statement} from './reports/cus-cr-deb/main';
import { Purchase_main } from './purchase/main';
import { PaymentComponentsonbills } from './admin/cash_on_bill/main';
import { Purchase_all } from './admin/purchase_all/view/main';
import  { Expence_main_details } from './admin/purchase_all/detail_view/main';
import { ListStock_details } from './reports/stock_detailed/main';

const routes: Routes = [
    { path: '', component: HomeComponents },
    { path: 'login',component: LoginComponent },
    { path: 'dash', component: DashComponent,canActivate:[AuthGuard] },
    { path: 'New', component: Bill_b2b,canActivate:[AuthGuard] },
    { path: 'invoice-all-b2b', component: Invoiceall_b2b,canActivate:[AuthGuard && User_role]},
    { path: 'invoice-all-b2c', component: Invoiceall_b2c,canActivate:[AuthGuard && User_role]},
       
    { path: 'add-product', component: Add_product, canActivate:[AuthGuard && User_role] },
    { path: 'update-product', component: Update_product, canActivate:[AuthGuard && User_role] },
    { path: 'set-greeting', component: Greeting_Component, canActivate:[AuthGuard && User_role] },
    { path: 'manage-tax', component: Tax_manageComponent, canActivate:[AuthGuard && User_role] },
    { path: 'manage-customer', component: Customer_Component, canActivate:[AuthGuard && User_role] },
    { path: 'reports-main', component: MainReportComponent, canActivate:[AuthGuard && User_role] },
    { path: 'expense-main', component: Expence_main, canActivate:[AuthGuard && User_role] },
    { path: 'report_stock', component: ListStock, canActivate:[AuthGuard] },
    { path: 'report_auditor', component: Auditor_statement, canActivate:[AuthGuard && User_role]},
    { path: 'report_revenue', component: Revenue_report, canActivate:[AuthGuard && User_role]},
    { path: 'purchase_report', component: Purchase_report, canActivate:[AuthGuard && User_role]},
    { path: 'expense_report', component: Expense_report, canActivate:[AuthGuard && User_role] },
    { path: 'sales_report', component: SalesReport, canActivate:[AuthGuard && User_role] },
    { path: 'cash_intake', component: PaymentComponents, canActivate:[AuthGuard && User_role]},
    { path: 'customer_statement', component: Customer_statement, canActivate:[AuthGuard && User_role]},
    { path: 'manage-prefix', component: Admin_Invoice_string_mainComponent, canActivate:[AuthGuard && User_role]},  
    { path: 'back_up', component: BackupComponents, canActivate:[AuthGuard && User_role] },  
    { path: 'Return', component: ReturnComponent, canActivate:[AuthGuard && User_role] },  
    { path: 'Cus-cr-deb', component: Customer_cr_deb_statement, canActivate:[AuthGuard && User_role]}, 
    { path: 'Purchase-main', component: Purchase_main, canActivate:[AuthGuard && User_role]},
    { path: 'cash-on-bill', component: PaymentComponentsonbills, canActivate:[AuthGuard && User_role]},
    { path: 'purchase_all', component: Purchase_all, canActivate:[AuthGuard && User_role] },  
    { path: 'purchase_details', component: Expence_main_details, canActivate:[AuthGuard && User_role] },     
    { path: 'stock_report_detail', component: ListStock_details, canActivate:[AuthGuard && User_role] },
    
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }