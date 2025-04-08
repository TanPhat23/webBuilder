import { EditorElement } from "../type";
import { navbarComponent, navbarComponent2, navbarComponent3, navbarComponent4, navbarComponent5 } from "./navbar/navbarComponents";
import { footerComponent, footerComponent2, footerComponent3, footerComponent4 } from "./footer/footerComponents";
import { headerComponent, headerComponent2, headerComponent3 } from "./header/headerComponents";
import { sidebarLeftComponent, sidebarLeftComponent2, sidebarLeftComponent3, sidebarLeftComponent4 } from "./sidebar/sidebarLeftComponents";
import { sidebarRightComponent, sidebarRightComponent2, sidebarRightComponent3, sidebarRightComponent4 } from "./sidebar/sidebarRightComponents";
import { teamMembersComponent1, teamMembersComponent2, teamMembersComponent3, teamMembersComponent4, teamMembersComponent5 } from "./team/teamMembersComponents";
import { missionComponent1, missionComponent2, missionComponentCompact, missionComponentSlider } from "./mission/missionComponents";

export interface CustomComponent {
  component: EditorElement;
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
  teamMembersComponent1,
  teamMembersComponent2,
  teamMembersComponent3,
  teamMembersComponent4,
  teamMembersComponent5,
  missionComponent1,
  missionComponent2,
  missionComponentCompact,
  missionComponentSlider,
];
