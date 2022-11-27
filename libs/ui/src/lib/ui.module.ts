import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialElementModules } from './material.module';
import { DialogComponent } from './dialog/dialog.component';
import { UiComponent } from './ui/ui.component';


@NgModule({
  declarations: [DialogComponent, UiComponent],
  imports: [CommonModule, MaterialElementModules],
  exports: [MaterialElementModules]
})
export class UiModule {}
