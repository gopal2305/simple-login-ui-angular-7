import { AlertService } from '@/_services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, UserService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        let payload = {
            "username": this.authenticationService.currentUserValue.username
        }
        this.userService.logout(payload).subscribe(res => {
            this.alertService.success(this.authenticationService.currentUserValue.username + ' user successfully logout!!', true);
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        },
            err => {
                this.alertService.error(err);
            });
    }
}