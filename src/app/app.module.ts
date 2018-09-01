import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BtnComponent} from './components/button/button.component';
import { TaskComponent} from './components/task/task.component';
import { TaskBoardComponent} from './components/taskboard/taskboard.component';
import { TimeCardComponent } from './components/timecard/timecard.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnComponent,
    TaskComponent,
    TaskBoardComponent,
    TimeCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
