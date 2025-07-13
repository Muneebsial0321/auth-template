import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestUserType } from "../guards/user.type";

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext):RequestUserType | null => {
    const request = ctx.switchToHttp().getRequest<{ user?: RequestUserType }>();
    if (request.user) return request.user
    return null
})