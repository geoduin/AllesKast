import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialElementModules } from './material.module';

@NgModule({
  imports: [CommonModule, MaterialElementModules],
  exports: [MaterialElementModules]
})
export class UiModule {}
