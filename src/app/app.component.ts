import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'userTablePro';
  displayedColumns: string[] = ['userID', 'FirstName', 'LastName', 'Email','MobileNo','Password','Experience','Address','CVLineDescription','Education','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog,
    private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllUser();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val ==='Create'){
      this.getAllUser();
      }
    })
  }
  getAllUser(){ 
    this.api.getUser()
    .subscribe({
      next:(res)=>{
        
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while disply record...!!")
      }
    })
    

  }
  deleteUser(id:number){
    var proceed = confirm("Are you sure you want to delete User");
        if (proceed) {
           alert("User Deleted Successfully !!!") 
          this.api.deleteUser(id)
          .subscribe({
           next:(res)=>{
          this.getAllUser();
           },
            error:()=>{
           alert('Error to delete user !!');
          }
          })
        }
        else{
          
        }
  }

  editUser(row : any){
    this.dialog.open(DialogComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
      this.getAllUser();
      }
    })
  }

     
    
    
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
