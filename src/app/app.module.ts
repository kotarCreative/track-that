import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BtnComponent} from './components/button/button.component';
import { ModalComponent } from './components/modals/modal.component';
import { TaskComponent} from './components/task/task.component';
import { TaskBoardComponent} from './components/taskboard/taskboard.component';
import { TimeCardComponent } from './components/timecard/timecard.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnComponent,
    ModalComponent,
    TaskComponent,
    TaskBoardComponent,
    TimeCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
