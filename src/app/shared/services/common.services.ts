import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()

export class CommonService {
  constructor(
    private router: Router
  ) {}

  getNavigate(url) {
    this.router.navigate([url]);
  }
}
