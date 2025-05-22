import { Component, Input } from "@angular/core";
import { NzSiderComponent } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

@Component({
  selector: "app-side",
  imports: [NzSiderComponent, NzMenuModule],
  standalone: true,
  templateUrl: "./side.component.html",
  styleUrls: ["./side.component.css"],
})
export class SideComponent {
  @Input() isCollapsed = true;
  isMobile = false;

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener("resize", () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
