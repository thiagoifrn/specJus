import { Component, OnInit } from "@angular/core";
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
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
  template: `
    <nz-layout class="app-layout">
      <nz-sider
        class="menu-sidebar"
        nzCollapsible
        nzWidth="256px"
        nzBreakpoint="md"
        [(nzCollapsed)]="isCollapsed"
        [nzTrigger]="null"
      >
        <div class="sidebar-logo">
          <a routerLink="/">
            <h1>SpecJus</h1>
          </a>
        </div>
        <ul
          nz-menu
          nzTheme="dark"
          nzMode="inline"
          [nzInlineCollapsed]="isCollapsed"
        >
          <li nz-menu-item nzMatchRouter routerLink="/prazos">
            <i nz-icon nzType="calendar"></i>
            <span>Prazos</span>
          </li>
          <li nz-menu-item nzMatchRouter routerLink="/notificacoes">
            <i nz-icon nzType="notification"></i>
            <span>Notificações</span>
          </li>
          <li nz-menu-item nzMatchRouter routerLink="/configuracoes">
            <i nz-icon nzType="setting"></i>
            <span>Configurações</span>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header>
          <div class="app-header">
            <span class="header-trigger" (click)="isCollapsed = !isCollapsed">
              <i
                nz-icon
                class="trigger"
                [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
              ></i>
            </span>
            <div class="header-user">
              <a nz-dropdown [nzDropdownMenu]="menu">
                <nz-avatar nzIcon="user"></nz-avatar>
                <span class="username">João Silva</span>
              </a>
              <nz-dropdown-menu #menu="nzDropdownMenu">
                <ul nz-menu>
                  <li nz-menu-item routerLink="/configuracoes">
                    <i nz-icon nzType="user"></i> Meu Perfil
                  </li>
                  <li nz-menu-item (click)="logout()">
                    <i nz-icon nzType="logout"></i> Sair
                  </li>
                </ul>
              </nz-dropdown-menu>
            </div>
          </div>
        </nz-header>
        <nz-content>
          <div class="inner-content">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      .app-layout {
        height: 100vh;
      }

      .menu-sidebar {
        position: relative;
        z-index: 10;
        min-height: 100vh;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
      }

      .sidebar-logo {
        position: relative;
        height: 64px;
        padding-left: 24px;
        overflow: hidden;
        line-height: 64px;
        background: #001529;
        transition: all 0.3s;
      }

      .sidebar-logo h1 {
        display: inline-block;
        margin: 0 0 0 20px;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        vertical-align: middle;
      }

      .sidebar-logo a {
        text-decoration: none;
      }

      nz-header {
        padding: 0;
        width: 100%;
        z-index: 2;
      }

      .app-header {
        position: relative;
        height: 64px;
        padding: 0;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-trigger {
        height: 64px;
        padding: 20px 24px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s, padding 0s;
      }

      .trigger:hover {
        color: #1890ff;
      }

      .header-user {
        padding-right: 24px;
        cursor: pointer;
      }

      .username {
        margin-left: 8px;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        height: 100%;
      }
    `,
  ],
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
