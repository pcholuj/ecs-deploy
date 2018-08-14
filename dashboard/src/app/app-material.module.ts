import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatListModule],
})
export class AppMaterialModule { }
