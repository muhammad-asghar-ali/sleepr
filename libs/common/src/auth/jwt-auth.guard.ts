import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, map, Observable, of, tap } from "rxjs";
import { AUTH_SERVCIE } from "../contents";
import { UserDto } from "../dto";

/**
 * ClientProxy allow us to communicate with other microservices
 */

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVCIE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies.Authentication;

    if (!jwt) {
      return false;
    }
    return this.authClient
      .send<UserDto>("authenicate", {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }
}
