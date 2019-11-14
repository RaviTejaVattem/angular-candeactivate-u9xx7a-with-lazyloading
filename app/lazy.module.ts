import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LazyComponent } from "./lazy.component";
import { serviceName } from "./deactivate.service";

const routes: Routes = [
  {
    path: "",
    component: LazyComponent,
    canDeactivate: [serviceName]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [LazyComponent],
  providers: [],
  bootstrap: []
})
export class LazyModule {}
