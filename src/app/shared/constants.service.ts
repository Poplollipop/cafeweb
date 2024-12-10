import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  // 錯誤訊息
  public static commonError: string = "出現錯誤，請稍後嘗試！"

  // 陣列
  public static nameRegex: string = "[a-zA-Z0-9]*"

  public static emailRegex: string = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9._-]+\\.[a-zA-Z]{2,}$"

  public static contactNumberRegex: string = "^[0-9]{10}$"

  // 變數
  public static error: string = "error"

  public static unauth: string = "您並未授權於此操作！"

}
