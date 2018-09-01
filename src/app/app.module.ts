import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BtnComponent} from './components/button/button.component';
import { TaskComponent} from './components/task/task.component';
import { TimeCardComponent } from './components/timecard/timecard.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnComponent,
    TaskComponent,
    TimeCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
