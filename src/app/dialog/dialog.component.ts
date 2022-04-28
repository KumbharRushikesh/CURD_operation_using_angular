import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  UserForm !: FormGroup;
  ActionBtn : string = "Create"
  ActionName : string = "Create User"

  constructor(private formBuilder: FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      userID: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      MobileNo: ['', Validators.required],
      Password: ['', Validators.required],
      Experience: ['', Validators.required],
      Address: ['', Validators.required],
      CVLineDescription: ['', Validators.required],
      Education:['', Validators.required]
    })
    if(this.editData){
      this.ActionBtn = "Update";
      this.ActionName = "Edit User"
      this.UserForm.controls['userID'].setValue(this.editData.userID);
      this.UserForm.controls['FirstName'].setValue(this.editData.FirstName);
      this.UserForm.controls['LastName'].setValue(this.editData.LastName);
      this.UserForm.controls['Email'].setValue(this.editData.Email);
      this.UserForm.controls['MobileNo'].setValue(this.editData.MobileNo);
      this.UserForm.controls['Password'].setValue(this.editData.Password);
      this.UserForm.controls['Experience'].setValue(this.editData.Experience);
      this.UserForm.controls['Address'].setValue(this.editData.Address);
      this.UserForm.controls['CVLineDescription'].setValue(this.editData.CVLineDescription);
      this.UserForm.controls['Education'].setValue(this.editData.Education);



    }

    console.log(this.editData);
    
  }

  CreateUser() {
    if(!this.editData){
      if(this.UserForm.valid){
        this.api.postUser(this.UserForm.value)
        .subscribe({
          next:(res)=>{
            alert("User added successfully");
            this.UserForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the user")
          }
        })
      }
    }else{
      this.updateUser()
    }
  }
  updateUser(){
    this.api.putUser(this.UserForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated successfully");
        this.UserForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record..!!")
      }

    })
  }

}
 