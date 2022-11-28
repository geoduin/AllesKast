import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class FallbackFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        console.log("Exception filter triggered" , JSON.stringify(exception));
        const ctx = host.switchToHttp();

        const response = ctx.getResponse(); 

        return response.status(500).json({
            status: 500,
            createdBy: "Fallback exception filter",
            errorMessage: exception.message ? exception.message : "Server fout"
        });
    }
    
}