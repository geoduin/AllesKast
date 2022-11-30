import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter{
    
    
    catch(exception: any, host: ArgumentsHost) {
        console.log("Exception filter triggered" , JSON.stringify(exception));
        const ctxh = host.switchToHttp();

        const response = ctxh.getResponse(),
            request = ctxh.getRequest();
        const st = exception.getStatus();    

        return response.status(st).json({
            status: st,
            createdBy: "HttpFilters",
            errorMessage: exception.message
        });
    }

}