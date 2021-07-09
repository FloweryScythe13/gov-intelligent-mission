import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Third Party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBusyModule } from 'ng-busy';
import { ToasterModule } from 'angular2-toaster';

import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
// import { NavMenuComponent } from './nav-menu/nav-menu.component';
// import { LoginComponent } from './login/login.component';
import { IdentityInfoService, MIApiService } from './services/services';
import { IdentityInfo } from './shared/shared';
import { AppComponent, AudioAnalysisComponent, AudioAnalysisDetailComponent, ConfirmModalComponent, FileUploadModal, HomeComponent, ImageAnalysisComponent, ImageAnalysisDetailComponent, GroupEditorModal, KnownIndividualsComponent, LoginComponent, NavMenuComponent, PersonDetailModal, PersonEditorModal, TextAnalysisComponent, VideoAnalysisComponent, VideoAnalysisDetailComponent, StrategyAnalysisComponent, NodeEditorModal } from './components';
import { VisModule } from 'ngx-vis';
import { Network } from 'vis-network';

export function initApp(identityService: IdentityInfoService) {
  return () => identityService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    AudioAnalysisComponent,
    AudioAnalysisDetailComponent,
    ConfirmModalComponent,
    FileUploadModal,
    GroupEditorModal,
    HomeComponent,
    ImageAnalysisComponent,
    ImageAnalysisDetailComponent,
    KnownIndividualsComponent,
    LoginComponent,
    NavMenuComponent,
    PersonDetailModal,
    PersonEditorModal,
    TextAnalysisComponent,
    VideoAnalysisComponent,
    VideoAnalysisDetailComponent,
    StrategyAnalysisComponent,
    NodeEditorModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgBusyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ToasterModule.forRoot(),
    VisModule
  ],
  providers: [
    MIApiService,
    IdentityInfoService,
    {
      provide: APP_INITIALIZER,
      // useFactory: (config: IdentityInfoService) => () => {
      //   return config.load();
      // },
      //useFactory: (identityService: IdentityInfoService) => () => identityService.load(),
      useFactory: initApp,
      deps: [IdentityInfoService],
      multi: true
    },
  ],
  bootstrap: [
    AppComponent,
    NavMenuComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    FileUploadModal,
    GroupEditorModal,
    PersonDetailModal,
    PersonEditorModal,
    NodeEditorModal
  ],
})
export class AppModule { }

