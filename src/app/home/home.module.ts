import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PopoverComponent } from '../popover/popover.component';
import { ChartsComponent } from '../charts/charts.component';

import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartbarComponent } from '../chartbar/chartbar.component';
import { ChartlineComponent } from '../chartline/chartline.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgApexchartsModule,
  ],
  declarations: [HomePage, PopoverComponent, ChartsComponent, ChartbarComponent, ChartlineComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
