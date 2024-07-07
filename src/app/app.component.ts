import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import { ApiResponse, Task, Tasks } from './model/task';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular_17_todo';

  allTaskList: Task[] = [];
  createTask: Tasks = new Tasks();

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadAllTask();
  }

  loadAllTask() {
    this.masterService.getAllTask().subscribe({
      next: (res: ApiResponse) => {
        this.allTaskList = res.data;
      },
      error: (err: HttpErrorResponse) => {
        alert('Api Call Error' + err.error.message);
      },
      complete: () => {
        console.log('success!!!');
      },
    });
  }

  postNewTask() {
    // this.masterService.createNewTask(this.createTask).subscribe((res: ApiResponse)=>{
    //   if(res.result){
    //     alert("Task Created Succesfully")
    //     this.loadAllTask();
    //     this.createTask= new Tasks()
    //   }
    // },error=>{
    //   alert("Api Call Error")
    // })

    this.masterService.createNewTask(this.createTask).subscribe({
      next: (res: ApiResponse) => {
        if (res.result) {
          alert('Task Created Succesfully');
          this.loadAllTask();
          this.createTask = new Tasks();
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Api Call Error' + err.error.message);
      },
      complete: () => {
        console.log('success!!!');
      },
    });
  }

  onEdit(obj: Tasks) {
    this.createTask = obj;

    setTimeout(() => {
      const dueDate = new Date(this.createTask.dueDate);
      const day = ('0' + dueDate.getDate()).slice(-2);
      const month = ('0' + dueDate.getMonth() + 1).slice(-2);
      const today = (
        '0' +
        dueDate.getFullYear() +
        '-' +
        (month) +
        '0' +
        (day)
      ).slice(-2);

      // const date= document.getElementById("customDate");
      // if(!date){
      //   date?.["value"]= today

      (<HTMLInputElement>document.getElementById('customDate')).value = today;
    },1000);
  }

  updateTask(){
    this.masterService.editTask(this.createTask).subscribe({
      next: (res: ApiResponse) => {
        if (res.result) {
          alert('Task Updated Succesfully');
          this.loadAllTask();
          this.createTask = new Tasks();
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Api Call Error' + err.error.message);
      },
      complete: () => {
        console.log('success!!!');
      },
    });
  }

  onDelete(id:number){
    this.masterService.deleteTask(id).subscribe({
      next: (res: ApiResponse) => {
        if (res.result) {
          alert('Task Deleted Succesfully');
          this.loadAllTask();
          this.createTask = new Tasks();
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Api Call Error' + err.error.message);
      },
      complete: () => {
        console.log('success!!!');
      },
    });
  }
}
