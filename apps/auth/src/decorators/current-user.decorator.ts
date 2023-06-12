import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserDocument } from "../users/models";

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_date: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context)
);
