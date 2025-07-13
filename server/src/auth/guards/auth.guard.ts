import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { Request } from "express"
import { JwtService } from "../jwt.service"
import { RequestUserType } from "./user.type";

interface IRequestWithUser extends Request {
    user: RequestUserType
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwt: JwtService
    ) {
    }
    canActivate(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest<IRequestWithUser>();
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new ForbiddenException("No token found");
        const user = this.jwt.verify(token);
        if (user){
            req.user = user;
            return true;
        }
        return false
    }
}