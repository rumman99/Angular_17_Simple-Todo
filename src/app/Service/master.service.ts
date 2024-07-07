import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Tasks } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl:string= "https://freeapi.gerasim.in/api/JWT/";

  private http = inject(HttpClient)

  constructor() { }

  getAllTask():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl+'GetAllTaskList');
  }

  createNewTask(obj:Tasks):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.apiUrl}CreateNewTask`,obj);
  }

  editTask(obj:Tasks):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.apiUrl}UpdateTask`, obj);
  }

  deleteTask(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.apiUrl}DeleteTask?itemId=${id}`);
  }
}
