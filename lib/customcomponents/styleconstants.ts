import { EditorElement } from "../type";
import { navbarComponent, navbarComponent2, navbarComponent3, navbarComponent4, navbarComponent5 } from "./navbar/navbarComponents";
import { footerComponent, footerComponent2, footerComponent3, footerComponent4 } from "./footer/footerComponents";
import { headerComponent, headerComponent2, headerComponent3 } from "./header/headerComponents";
import { sidebarLeftComponent, sidebarLeftComponent2, sidebarLeftComponent3, sidebarLeftComponent4 } from "./sidebar/sidebarLeftComponents";
import { sidebarRightComponent, sidebarRightComponent2, sidebarRightComponent3, sidebarRightComponent4 } from "./sidebar/sidebarRightComponents";
import { aboutCarouselHorizontal, aboutCarouselVertical, aboutDynamicHorizontal, aboutDynamicVertical, teamMembersComponent1, teamMembersComponent2, teamMembersComponent3 } from "./team/teamMembersComponents";
import { missionComponent1, missionComponent2, missionComponentCompact, missionComponentSlider } from "./mission/missionComponents";
import { barChartComponent, pieChartComponent, lineChartComponent } from "./chart/chartComponents";
import { simpleDataTableComponent, complexDataTableComponent } from "./data/dataTableComponents";
import { clockWidgetComponent, digitalClockWidgetComponent } from "./widgets/widgetComponents";
import { formComponent1, formComponent2 } from "./form/formComponents";
import { onboardingComponent } from "./onboarding/onboardingComponents";
import { youtubeIframeComponent } from "./iFrameYoutube/iFrameComponent";

export interface CustomComponent {
  component: Partial<EditorElement>;
}

export const customComponents: CustomComponent[] = [
  navbarComponent,
  navbarComponent2,
  navbarComponent3,
  navbarComponent4,
  navbarComponent5,
  footerComponent,
  footerComponent2,
  footerComponent3,
  footerComponent4,
  headerComponent,
  headerComponent2,
  headerComponent3,
  sidebarLeftComponent,
  sidebarLeftComponent2,
  sidebarLeftComponent3,
  sidebarLeftComponent4,
  sidebarRightComponent,
  sidebarRightComponent2,
  sidebarRightComponent3,
  sidebarRightComponent4,
  aboutDynamicVertical,
  aboutDynamicHorizontal,
  aboutCarouselVertical,
  aboutCarouselHorizontal,
  teamMembersComponent1,
  teamMembersComponent2,
  teamMembersComponent3,
  missionComponent1,
  missionComponent2,
  missionComponentCompact,
  missionComponentSlider,
  barChartComponent,
  pieChartComponent,
  lineChartComponent,
  simpleDataTableComponent,
  complexDataTableComponent,
  clockWidgetComponent,
  digitalClockWidgetComponent,
  formComponent1,
  formComponent2,
  onboardingComponent,
  youtubeIframeComponent,
];