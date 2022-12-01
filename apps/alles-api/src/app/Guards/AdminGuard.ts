import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthorizationGuard } from "./AuthorizationGuard";

@Injectable()
export class AdminGuard extends AuthorizationGuard{

    constructor(){
        super(["Admin", "Boss"]);
    }
}

@Injectable()
export class BossGuard extends AuthorizationGuard{
    constructor(){
        super(["Boss"]);
    }
}