import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class serviceName {
  canDeactivate(component) {
    console.log(">>>>>>>>>>>>>>>>> canDeactivate called");
    return false;
  }
}
