import { Component, NgModule } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { Routes, RouterModule, Router, NavigationStart } from "@angular/router";
import { Event as NavigationEvent } from "@angular/router";
import { filter, tap } from "rxjs/operators";

@Component({
  selector: "my-app",
  template: `
    <a routerLink="A" class="space">A</a>
    <a routerLink="B" class="space">B</a>
    <a routerLink="C" class="space">C</a>
    <a routerLink="lazy" class="space">Lazy</a>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .space {
        padding: 10px;
      }
    `
  ]
})
export class AppComponent {
  constructor(private router: Router, private location: LocationStrategy) {
    location.onPopState((value) => {
      console.log('?????????????????');
      console.log('BROWSER BUTTON CLICKED', value);
      router.navigate
    });
    router.events
      .pipe(
        // The "events" stream contains all the navigation events. For this demo,
        // though, we only care about the NavigationStart event as it contains
        // information about what initiated the navigation sequence.
        tap(events => {
          console.log('>>>>>>>>>>>>>>');
          console.log(events);
        }),
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        console.group("NavigationStart Event");
        // Every navigation sequence is given a unique ID. Even "popstate"
        // navigations are really just "roll forward" navigations that get
        // a new, unique ID.
        console.log("navigation id:", event.id);
        console.log("route:", event.url);
        // The "navigationTrigger" will be one of:
        // --
        // - imperative (ie, user clicked a link).
        // - popstate (ie, browser controlled change such as Back button).
        // - hashchange
        // --
        // NOTE: I am not sure what triggers the "hashchange" type.
        console.log("trigger:", event.navigationTrigger);

        // This "restoredState" property is defined when the navigation
        // event is triggered by a "popstate" event (ex, back / forward
        // buttons). It will contain the ID of the earlier navigation event
        // to which the browser is returning.
        // --
        // CAUTION: This ID may not be part of the current page rendering.
        // This value is pulled out of the browser; and, may exist across
        // page refreshes.
        if (event.restoredState) {
          console.warn(
            "restoring navigation id:",
            event.restoredState.navigationId
          );
        }

        console.groupEnd();
      });
  }
}

@Component({
  selector: "app-a",
  template: "<h1>A</h1>"
})
export class AComponent {}

@Component({
  selector: "app-b",
  template: "<h1>B</h1>"
})
export class BComponent {}

@Component({
  selector: "app-c",
  template: "<h1>C</h1>"
})
export class CComponent {}

/** router */

const routes: Routes = [
  { path: "A", component: AComponent },
  { path: "B", component: BComponent },
  { path: "C", component: CComponent },
  { path: "lazy", loadChildren: "./lazy.module#LazyModule" },
  {
    path: "",
    redirectTo: "A",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
