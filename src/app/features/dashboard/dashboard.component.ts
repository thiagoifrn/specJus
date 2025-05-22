import { Component, OnInit } from "@angular/core";
import { Router, RouterOutlet, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";

// Import ng-zorro components
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzButtonModule } from "ng-zorro-antd/button";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzDropDownModule,
    NzButtonModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
