import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-backup',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class BackupComponents implements OnInit {


     constructor(private router: Router,private ds: DataService) {
    
     
    
  }
  

  ngOnInit() {

   
  }



get_back_up()

{
  this.ds.backup()
  .subscribe((jsonData) => { this.get_backup_res(jsonData)
                      },(err) => console.error(err),
                       
                      );
}

get_backup_res(json : any)
{
  if(json === 'Backup completed')
  {
    alert('Backup Completed')
  }
  else
  {
    alert('error contact Service')
  }

}


}
