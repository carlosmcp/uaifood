import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

@Catch()
export class ExceptionFilterMicroservice implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    
    try {
      const erroObject = JSON.parse(JSON.stringify(error.message));
      const statusCode = error.status || erroObject.statusCode || 500;
      const result = error.status ? error : erroObject;
      console.log("result", result);
     return response.status(statusCode).send(result);
    } catch {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).send({});
    }
  }
}
