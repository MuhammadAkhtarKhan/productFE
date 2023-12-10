import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class HelperFunctionsService {
  public parameters:any;
  constructor() { }
  convertDateToYearMonthAndDay(date:any): string {
    let month;
    let day;
    // format for month
    if (date.month.toString().length < 2) {
      month = '0' + date.month;
    } else {
      month = date.month;
    }
    if (date.month.toString().length < 2) {
      month = '0' + date.month;
    } else {
      month = date.month;
    }
    //format for day
    if (date.day.toString().length < 2) {
      day = '0' + date.day;
    } else {
      day = date.day;
    }
    let createDate = date.year + '-' + month + '-' + day
    return createDate;

  }
  convertDateToYearMonthDay(dateString:string){
    var date = new Date(dateString);
    let day = date.getDate().toString().padStart(2,'0');
    let month = (date.getMonth() + 1).toString().padStart(2,'0');;
    let year = date.getFullYear().toString();
   return year+'-'+month+'-'+day
  }



  updateParams(params:any){
    this.parameters=params;
  }
  getParams(){
    let params=this.parameters;
    this.parameters=null;
    return params;
  }
}
