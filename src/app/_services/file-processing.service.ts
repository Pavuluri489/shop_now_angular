import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.module';

@Injectable({
  providedIn: 'root'
})
export class FileProcessingService {

  constructor(private sanitizer:DomSanitizer) { }
  public fileProcess(file:any){
    const fileBlob = this.dataURItoBlob(file.picBytes,file.type);
    const dataFile= new File([fileBlob],file.name,{type:file.type});
    const fileHandle:FileHandle={
      file:dataFile ,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(dataFile))
    };
    return fileHandle;
  }
  dataURItoBlob(picBytes: string, type: any) {
    const byteString= window.atob(picBytes);
    const arrayBuffer=new ArrayBuffer(byteString.length);
    const int8Array=new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
      int8Array[i]=byteString.charCodeAt(i);
    }
    return new Blob([int8Array],{type:type});
  }
}
