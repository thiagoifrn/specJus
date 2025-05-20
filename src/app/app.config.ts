import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { NZ_I18N, pt_BR } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import pt from "@angular/common/locales/pt";
import { NzIconModule } from "ng-zorro-antd/icon";
import {
  UserOutline,
  LockOutline,
  NotificationOutline,
  SettingOutline,
  MenuFoldOutline,
  LogoutOutline,
  SyncOutline,
} from "@ant-design/icons-angular/icons";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

const icons = [
  UserOutline,
  LockOutline,
  NotificationOutline,
  SettingOutline,
  MenuFoldOutline,
  LogoutOutline,
  SyncOutline,
];
registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: NZ_I18N, useValue: pt_BR },
    importProvidersFrom(NzIconModule.forRoot(icons)),
    importProvidersFrom(NzLayoutModule),
    importProvidersFrom(NzMenuModule),
  ],
};
