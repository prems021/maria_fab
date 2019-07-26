import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { ReportService }  from '../../services/report.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainReportComponent implements OnInit {


   
   x : number = 0;
   

 
  from_date : string;
  option : number = 0;
  myDate = new Date();
  dateForm = this.fb.group({                  
                                                  
                                                  from_date : '',
                                                  to_date: '',
                                                 
                                              
                                         });
  constructor(private fb: FormBuilder, private rs : ReportService , private router : Router ) { }
 
  ngOnInit() {
    this.myDate = new Date();
     this.x = this.myDate.getTime() + (60*60*24*1000)
     this.myDate.setTime(this.x) 
     this.rs.to_date=this.myDate.toISOString().slice(0,10);
  }


cat_to_date(s:any)
{
  
     this.x = this.myDate.getTime() + (60*60*24*1000)
     this.myDate.setTime(this.x) 
 
  this.rs.to_date=this.myDate.toISOString().slice(0,10);

 }

cat_from_date(s:any)
{
 this.from_date =  s._validSelected;
  this.rs.from_date = this.from_date ;
}


go_report(s:number)
{



  
  if(s === 1)
  {
    this.option = 1;
  }
  if(s === 2)
  {
 
   
   this.option = 1;
    this.router.navigate(['/report_revenue']);
   
  }
  if(s === 3)
  {
    this.option = 3;
     this.router.navigate(['/report_revenue']);
  }
  else
  {
   this.router.navigate(['/report_revenue']);
  }
}
}