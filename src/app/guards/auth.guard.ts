import { AlertifyService } from "./../services/alertify.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canActivate(): boolean {
    if (this.auth.loggdIn())
      return true;

    this.alertify.error("Not authorized");
    this.router.navigate(['/']);
    return false;
  }
}
