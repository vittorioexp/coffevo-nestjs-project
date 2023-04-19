import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Protocol = createParamDecorator(
    (defaultValue: unknown, ctx: ExecutionContext) => {
        //console.log({defaultValue});
        const request = ctx.switchToHttp().getRequest();
        return request.protocol;
    }
)