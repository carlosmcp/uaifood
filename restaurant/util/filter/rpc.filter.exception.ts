import { ArgumentsHost, Catch, HttpException, RpcExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: Error, host: ArgumentsHost): Observable<any> {
   return throwError(new RpcException({
      status: exception['status'] || HttpStatus.SERVICE_UNAVAILABLE, 
      message: exception.message || ""
      }));      
  }
}