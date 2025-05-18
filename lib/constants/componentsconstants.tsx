import React from "react";

type DraggableComponent = {
  component: React.ReactNode;
  label: string;
  type: string;
};

type ComponentCategory = {
  id: string;
  label: string;
  prefix: string;
  defaultOpen?: boolean;
};

const TextHolder = React.lazy(
  () => import("@/components/editor/sidebar/sidebarcomponentholders/TextHolder")
);
const LinkHolder = React.lazy(
  () => import("@/components/editor/sidebar/sidebarcomponentholders/LinkHolder")
);
const ButtonHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/ButtonHolder")
);
const FrameHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/FrameHolder")
);
const HeadingHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/HeadingHolder")
);
const CarouselHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/CarouselHolder")
);
const CardHolder = React.lazy(
  () => import("@/components/editor/sidebar/sidebarcomponentholders/CardHolder")
);
const ButtonMultiHolder = React.lazy(
  () =>
    import(
      "@/components/editor/sidebar/sidebarcomponentholders/ButtonMultiHolder"
    )
);
const ListItemHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/ListItemHolder")
);

const ImageHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/ImageHolder")
);
const InputHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/InputHolder")
);
const SelectHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/SelectHolder")
);
// const ChartHolder = React.lazy(
//   () =>
//     import("@/components/editor/sidebar/sidebarcomponentholders/ChartHolder")
// );
const DataTableHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/DataTableHolder")
);
const FormHolder = React.lazy(
  () =>
    import("@/components/editor/sidebar/sidebarcomponentholders/FormHolder")
);

// Constants
export const BASIC_COMPONENTS: DraggableComponent[] = [
  {
    component: <TextHolder />,
    label: "Text",
    type: "Text",
  },
  {
    component: <HeadingHolder />,
    label: "Heading",
    type: "Heading",
  },
  {
    component: <LinkHolder />,
    label: "Link",
    type: "Link",
  },
  {
    component: <ButtonHolder />,
    label: "Button",
    type: "Button",
  },
  {
    component: <FrameHolder />,
    label: "Frame",
    type: "Frame",
  },
  {
    component: <CarouselHolder />,
    label: "Carousel",
    type: "Carousel",
  },
  {
    component: <ListItemHolder />,
    label: "List Item",
    type: "ListItem",
  },
  {
    component: <ImageHolder />,
    label: "Image",
    type: "Image",
  },
  {
    component: <InputHolder />,
    label: "Input",
    type: "Input",
  },
  {
    component: <SelectHolder />,
    label: "Select",
    type: "Select",
  },
  {
    component: <FormHolder />,
    label: "Form",
    type: "Form",
  },
];

export const ADVANCED_COMPONENTS: DraggableComponent[] = [
  {
    component: <CardHolder />,
    label: "Card",
    type: "Card",
  },
  {
    component: <ButtonMultiHolder />,
    label: "Button Multi",
    type: "ButtonMulti",
  },
  // {
  //   component: <ChartHolder />,
  //   label: "Chart",
  //   type: "Chart",
  // },
  {
    component: <DataTableHolder />,
    label: "Data Table",
    type: "DataTable",
  },
];

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: "navbar",
    label: "Navbar Components",
    prefix: "NavBar",
  },
  {
    id: "footer",
    label: "Footer Components",
    prefix: "Footer",
  },
  {
    id: "header",
    label: "Header Components",
    prefix: "Header",
  },
  {
    id: "sidebar",
    label: "Sidebar Components",
    prefix: "Sidebar",
  },
  {
    id: "teamMembers",
    label: "Team Members Components",
    prefix: "TeamMembers",
  },
  {
    id: "missionComponents",
    label: "Mission Components",
    prefix: "MissionComponent",
  },
  {
    id: "chartComponents",
    label: "Chart Components",
    prefix: "Chart",
  },
  {
    id: "dataComponents",
    label: "Data Table Components",
    prefix: "DataTable",
  },
  {
    id: "widgetComponents",
    label: "Widget Components",
    prefix: "Widget",
  },
  {
    id: "formComponents",
    label: "Form Components",
    prefix: "Form",
  }
];
