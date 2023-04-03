import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest,HttpEvent, HttpErrorResponse, HttpResponse} from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private authService:AuthService,
        private router:Router
    ){}
    intercept(req: HttpRequest<any>,
        next: HttpHandler):Observable<HttpEvent<any>>{
            if(req.headers.get('No-Auth')==='True'){
               return next.handle(req.clone());
            }
            const accessToken =this.authService.getAccessToken();
            console.log("check 4")
            if(accessToken){
                console.log("check 5")
                req = this.addToken(req, accessToken);
               } 

               return next.handle(req).pipe(
                catchError(
                    (err:HttpErrorResponse) => {
                        console.log("staus :"+err.status);
                        
                        if(err.status === 401) {
                            this.router.navigate(['/login']);
                        } else if(err.status === 403) {
                            this.router.navigate(['/page']);
                        }
                        return throwError("Some thing is wrong");
                    }
                )
            );
        }
        private addToken(request:HttpRequest<any>, token:string) {
            return request.clone(
                {
                    setHeaders: {
                        Authorization : `Bearer ${token}`
                    }
                }
            );
        }
    
}