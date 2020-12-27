import { UserService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-audit',
    templateUrl: 'audit.component.html'
})

export class AuditComponent implements OnInit {
    users: User[] = [];
    configPage: any;
    maxSize: number = 5;
    directionLinks: boolean = true;
    autoHide: boolean = true;
    responsive: boolean = true;
    labels: any = {
        previousLabel: '',
        nextLabel: '',
    };

    constructor(private userService: UserService) {
        this.configPage = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.users.length
        };
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    // Function to handle the pagination
    pageChanged(event) {
        this.configPage.currentPage = event;
    }

    private loadAllUsers() {
        this.userService.auditUsers().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}