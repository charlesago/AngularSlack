import { HttpInterceptorFn } from '@angular/common/http';
import {GlobalConstants} from "../common/global-constants";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url == "https://messagerie.charlesagostinelli.com/register"){
    return next(req)
  }else
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${GlobalConstants.token}`
      }
    }));
};
