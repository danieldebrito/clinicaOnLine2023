import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGuard } from './admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AdminGuard
  ],
})
export class GuardsModule { }
