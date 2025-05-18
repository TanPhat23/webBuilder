import { EditorElement, ElementTypes } from "@/lib/type";
import { CustomComponent } from "../styleconstants";
import { v4 as uuidv4 } from "uuid";
import { FrameElement } from "@/lib/interface";

const createAboutCardVertical = (
  title: string = "About Title",
  description: string = "Description about this section.",
  imageSrc: string = "",
  link: string = "",
  linkText: string = "Learn More"
): FrameElement => {
  return {
    type: "Frame" as ElementTypes,
    name: "AboutCardVertical",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      maxWidth: "300px",
      margin: "0 auto",
    },
    tailwindStyles:
      "flex flex-col items-center p-5 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc
        ? {
            type: "Image" as ElementTypes,
            content: "About Image",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              height: "180px",
              borderRadius: "8px",
              objectFit: "cover",
              marginBottom: "20px",
            },
            tailwindStyles: "w-full h-48 rounded-lg object-cover mb-5",
            href: "",
            src: imageSrc,
            parentId: "",
            projectId: "",
          }
        : null,
      {
        type: "Text" as ElementTypes,
        content: title,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontWeight: "bold",
          fontSize: "20px",
          color: "#333",
          marginBottom: "10px",
          textAlign: "center",
        },
        tailwindStyles: "font-bold text-xl text-gray-800 mb-2 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: description,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#666",
          textAlign: "center",
          marginBottom: "20px",
        },
        tailwindStyles: "text-sm text-gray-600 text-center mb-5",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      link
        ? {
            type: "Link" as ElementTypes,
            content: linkText,
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              color: "#3b82f6",
              fontSize: "14px",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#eff6ff",
            },
            tailwindStyles:
              "text-blue-500 text-sm font-medium px-4 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors",
            href: link,
            src: "",
            parentId: "",
            projectId: "",
          }
        : null,
    ].filter(Boolean) as EditorElement[],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
};

const createAboutCardHorizontal = (
  title: string = "About Title",
  description: string = "Description about this section.",
  imageSrc: string = "",
  link: string = "",
  linkText: string = "Learn More"
): FrameElement => {
  return {
    type: "Frame" as ElementTypes,
    name: "AboutCardHorizontal",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      width: "100%",
      gap: "20px",
      margin: "0 auto",
    },
    tailwindStyles:
      "flex flex-col sm:flex-row items-center p-5 bg-white rounded-xl shadow-md w-full gap-5 mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc
        ? {
            type: "Image" as ElementTypes,
            content: "About Image",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              width: "120px",
              height: "120px",
              borderRadius: "8px",
              objectFit: "cover",
              flexShrink: "0",
            },
            tailwindStyles: "w-32 h-32 rounded-lg object-cover shrink-0",
            href: "",
            src: imageSrc,
            parentId: "",
            projectId: "",
          }
        : null,
      {
        type: "Frame" as ElementTypes,
        name: "ContentContainer",
        id: uuidv4(),
        content: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          display: "flex",
          flexDirection: "column",
          flex: "1",
        },
        tailwindStyles: "flex flex-col flex-1",
        elements: [
          {
            type: "Text" as ElementTypes,
            content: title,
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontWeight: "bold",
              fontSize: "20px",
              color: "#333",
              marginBottom: "8px",
            },
            tailwindStyles: "font-bold text-xl text-gray-800 mb-2",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text" as ElementTypes,
            content: description,
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontSize: "14px",
              color: "#666",
              marginBottom: "16px",
            },
            tailwindStyles: "text-sm text-gray-600 mb-4",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          link
            ? {
                type: "Link" as ElementTypes,
                content: linkText,
                id: uuidv4(),
                isSelected: false,
                x: 0,
                y: 0,
                styles: {
                  color: "#3b82f6",
                  fontSize: "14px",
                  fontWeight: "500",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  backgroundColor: "#eff6ff",
                  alignSelf: "flex-start",
                },
                tailwindStyles:
                  "text-blue-500 text-sm font-medium px-4 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors self-start",
                href: link,
                src: "",
                parentId: "",
                projectId: "",
              }
            : null,
        ].filter(Boolean) as EditorElement[],
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
    ].filter(Boolean) as EditorElement[],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
};

const createAboutComponent = (
  type: "dynamic" | "carousel" = "dynamic",
  layout: "vertical" | "horizontal" = "vertical",
  cards: Array<{
    title: string;
    description: string;
    imageSrc?: string;
    link?: string;
    linkText?: string;
  }> = [],
  maxCards: number = 4
): CustomComponent => {
  const limitedCards = cards.slice(0, maxCards);
  const aboutCards = limitedCards.map((card) =>
    layout === "vertical"
      ? createAboutCardVertical(
          card.title,
          card.description,
          card.imageSrc,
          card.link,
          card.linkText
        )
      : createAboutCardHorizontal(
          card.title,
          card.description,
          card.imageSrc,
          card.link,
          card.linkText
        )
  );
  const container: FrameElement = {
    type: "Frame" as ElementTypes,
    name: `About${type.charAt(0).toUpperCase() + type.slice(1)}${
      layout.charAt(0).toUpperCase() + layout.slice(1)
    }`,
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      backgroundColor: "#f8fafc",
    },
    tailwindStyles: "w-full flex flex-col items-center p-10 bg-slate-50",
    elements: [
      {
        type: "Text" as ElementTypes,
        content: "About Us",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontWeight: "bold",
          fontSize: "32px",
          color: "#1e293b",
          marginBottom: "20px",
          textAlign: "center",
        },
        tailwindStyles: "font-bold text-3xl text-slate-800 mb-5 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: "Learn more about what we do",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "18px",
          color: "#64748b",
          marginBottom: "40px",
          textAlign: "center",
          maxWidth: "700px",
        },
        tailwindStyles: "text-lg text-slate-500 mb-10 text-center max-w-2xl",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
    ],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
  if (type === "dynamic") {
    container.elements.push({
      type: "Frame" as ElementTypes,
      name: "AboutGrid",
      id: uuidv4(),
      content: "",
      isSelected: false,
      x: 0,
      y: 0,
      styles: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
      },
      tailwindStyles:
        "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 max-w-6xl",
      elements: aboutCards as EditorElement[],
      href: "",
      src: "",
      parentId: "",
      projectId: "",
    } as FrameElement);
  } else {
    container.elements.push({
      type: "Frame" as ElementTypes,
      name: "CarouselContainer",
      id: uuidv4(),
      content: "",
      isSelected: false,
      x: 0,
      y: 0,
      styles: {
        width: "100%",
        maxWidth: "1200px",
        position: "relative",
        overflow: "hidden",
      },
      tailwindStyles: "w-full max-w-6xl relative overflow-hidden",
      elements: [
        {
          type: "Frame" as ElementTypes,
          name: "CarouselTrack",
          id: uuidv4(),
          content: "",
          isSelected: false,
          x: 0,
          y: 0,
          styles: {
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "10px",
            scrollSnapType: "x mandatory",
            gap: "20px",
          },
          tailwindStyles:
            "flex overflow-x-auto scrollbar-hide p-2.5 snap-x snap-mandatory gap-5",
          elements: aboutCards as EditorElement[],
          href: "",
          src: "",
          parentId: "",
          projectId: "",
        },
      ],
      href: "",
      src: "",
      parentId: "",
      projectId: "",
    } as FrameElement);
  }

  return { component: container };
};

// Function to create a team member card
const createTeamMemberCard = (
  name: string = "John Doe",
  role: string = "Position",
  bio: string = "Short biography about the team member.",
  imageSrc: string = "",
  socialLinks: Array<{ url: string; icon: string }> = []
): FrameElement => {
  return {
    type: "Frame" as ElementTypes,
    name: "TeamMemberCard",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "280px",
      margin: "0 auto",
    },
    tailwindStyles:
      "flex flex-col items-center p-4 sm:p-6 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc
        ? {
            type: "Image" as ElementTypes,
            content: "Team Member Photo",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              width: "120px",
              height: "120px",
              borderRadius: "100%",
              objectFit: "cover",
              marginBottom: "20px",
              border: "4px solid #f1f5f9",
            },
            tailwindStyles:
              "w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 md:mb-5 border-4 border-slate-100",
            href: "",
            src: imageSrc,
            parentId: "",
            projectId: "",
          }
        : null,
      {
        type: "Text" as ElementTypes,
        content: name,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontWeight: "bold",
          fontSize: "18px",
          color: "#1e293b",
          marginBottom: "4px",
          textAlign: "center",
        },
        tailwindStyles:
          "font-bold text-base sm:text-lg text-slate-800 mb-1 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: role,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#64748b",
          marginBottom: "12px",
          textAlign: "center",
        },
        tailwindStyles:
          "text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: bio,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#64748b",
          textAlign: "center",
          marginBottom: "16px",
        },
        tailwindStyles:
          "text-xs sm:text-sm text-slate-500 text-center mb-3 sm:mb-4",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      socialLinks.length > 0
        ? {
            type: "Frame" as ElementTypes,
            name: "SocialLinks",
            id: uuidv4(),
            content: "",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            },
            tailwindStyles: "flex gap-2 md:gap-3 justify-center",
            elements: socialLinks.map((social) => ({
              type: "Link" as ElementTypes,
              content: social.icon,
              id: uuidv4(),
              isSelected: false,
              x: 0,
              y: 0,
              styles: {
                color: "#64748b",
                fontSize: "16px",
                padding: "8px",
              },
              tailwindStyles:
                "text-slate-500 text-sm sm:text-base p-1.5 sm:p-2 hover:text-slate-800 transition-colors",
              href: social.url,
              src: "",
              parentId: "",
              projectId: "",
            })),
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          }
        : null,
    ].filter(Boolean) as EditorElement[],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
};

const createTeamMembersComponent = (
  layout: "vertical" | "horizontal" | "carousel" = "vertical",
  members: Array<{
    name: string;
    role: string;
    bio: string;
    imageSrc?: string;
    socialLinks?: Array<{ url: string; icon: string }>;
  }> = [],
  maxMembers: number = 6
): CustomComponent => {
  const limitedMembers = members.slice(0, maxMembers);

  const memberCards = limitedMembers.map((member) => {
    if (layout === "vertical") {
      return createVerticalTeamMemberCard(
        member.name,
        member.role,
        member.bio,
        member.imageSrc,
        member.socialLinks
      );
    } else if (layout === "horizontal") {
      return createHorizontalTeamMemberCard(
        member.name,
        member.role,
        member.bio,
        member.imageSrc,
        member.socialLinks
      );
    } else {
      return createTeamMemberCard(
        member.name,
        member.role,
        member.bio,
        member.imageSrc,
        member.socialLinks
      );
    }
  });

  const container: FrameElement = {
    type: "Frame" as ElementTypes,
    name: `TeamMembers${layout.charAt(0).toUpperCase() + layout.slice(1)}`,
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px",
      backgroundColor: "#f8fafc",
    },
    tailwindStyles:
      "w-full flex flex-col items-center py-8 md:py-16 px-4 md:px-5 bg-slate-50",
    elements: [
      {
        type: "Text" as ElementTypes,
        content: "Our Team",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontWeight: "bold",
          fontSize: "32px",
          color: "#1e293b",
          marginBottom: "16px",
          textAlign: "center",
        },
        tailwindStyles: "font-bold text-3xl text-slate-800 mb-4 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: "Meet the talented people behind our success",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "18px",
          color: "#64748b",
          marginBottom: "40px",
          textAlign: "center",
          maxWidth: "700px",
        },
        tailwindStyles: "text-lg text-slate-500 mb-10 text-center max-w-2xl",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
    ],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };

  if (layout === "carousel") {
    container.elements.push({
      type: "Frame" as ElementTypes,
      name: "CarouselContainer",
      id: uuidv4(),
      content: "",
      isSelected: false,
      x: 0,
      y: 0,
      styles: {
        width: "100%",
        maxWidth: "1200px",
        position: "relative",
        overflow: "hidden",
      },
      tailwindStyles:
        "w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-6xl relative overflow-hidden",
      elements: [
        {
          type: "Frame" as ElementTypes,
          name: "CarouselTrack",
          id: uuidv4(),
          content: "",
          isSelected: false,
          x: 0,
          y: 0,
          styles: {
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "10px",
            scrollSnapType: "x mandatory",
            gap: "24px",
          },
          tailwindStyles:
            "flex overflow-x-auto scrollbar-hide p-2.5 snap-x snap-mandatory gap-4 md:gap-6",
          elements: memberCards as EditorElement[],
          href: "",
          src: "",
          parentId: "",
          projectId: "",
        },
      ],
      href: "",
      src: "",
      parentId: "",
      projectId: "",
    } as FrameElement);
  } else {
    container.elements.push({
      type: "Frame" as ElementTypes,
      name: "TeamGrid",
      id: uuidv4(),
      content: "",
      isSelected: false,
      x: 0,
      y: 0,
      styles: {
        width: "100%",
        display: layout === "vertical" ? "grid" : "flex",
        gridTemplateColumns:
          layout === "vertical"
            ? "repeat(auto-fill, minmax(250px, 1fr))"
            : undefined,
        flexDirection: layout === "horizontal" ? "column" : undefined,
        gap: "30px",
        maxWidth: "1200px",
      },
      tailwindStyles:
        layout === "vertical"
          ? "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl"
          : "w-full flex flex-col gap-4 sm:gap-6 md:gap-8 max-w-6xl",
      elements: memberCards as EditorElement[],
      href: "",
      src: "",
      parentId: "",
      projectId: "",
    } as FrameElement);
  }

  return { component: container };
};

// Vertical team member card (styled like a business card)
const createVerticalTeamMemberCard = (
  name: string = "John Doe",
  role: string = "Position",
  bio: string = "Short biography about the team member.",
  imageSrc: string = "",
  socialLinks: Array<{ url: string; icon: string }> = []
): FrameElement => {
  return {
    type: "Frame" as ElementTypes,
    name: "TeamMemberCardVertical",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "280px",
      margin: "0 auto",
    },
    tailwindStyles:
      "flex flex-col items-center p-4 sm:p-6 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc
        ? {
            type: "Image" as ElementTypes,
            content: "Team Member Photo",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              width: "120px",
              height: "120px",
              borderRadius: "100%",
              objectFit: "cover",
              marginBottom: "20px",
              border: "4px solid #f1f5f9",
            },
            tailwindStyles:
              "w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-4 md:mb-5 border-4 border-slate-100",
            href: "",
            src: imageSrc,
            parentId: "",
            projectId: "",
          }
        : null,
      {
        type: "Text" as ElementTypes,
        content: name,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontWeight: "bold",
          fontSize: "18px",
          color: "#1e293b",
          marginBottom: "4px",
          textAlign: "center",
        },
        tailwindStyles:
          "font-bold text-base sm:text-lg text-slate-800 mb-1 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: role,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#64748b",
          marginBottom: "12px",
          textAlign: "center",
        },
        tailwindStyles:
          "text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text" as ElementTypes,
        content: bio,
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "14px",
          color: "#64748b",
          textAlign: "center",
          marginBottom: "16px",
        },
        tailwindStyles:
          "text-xs sm:text-sm text-slate-500 text-center mb-3 sm:mb-4",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      socialLinks.length > 0
        ? {
            type: "Frame" as ElementTypes,
            name: "SocialLinks",
            id: uuidv4(),
            content: "",
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            },
            tailwindStyles: "flex gap-2 md:gap-3 justify-center",
            elements: socialLinks.map((social) => ({
              type: "Link" as ElementTypes,
              content: social.icon,
              id: uuidv4(),
              isSelected: false,
              x: 0,
              y: 0,
              styles: {
                color: "#64748b",
                fontSize: "16px",
                padding: "8px",
              },
              tailwindStyles:
                "text-slate-500 text-sm sm:text-base p-1.5 sm:p-2 hover:text-slate-800 transition-colors",
              href: social.url,
              src: "",
              parentId: "",
              projectId: "",
            })),
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          }
        : null,
    ].filter(Boolean) as EditorElement[],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
};

const createHorizontalTeamMemberCard = (
  name: string = "John Doe",
  role: string = "Position",
  bio: string = "Short biography about the team member.",
  imageSrc: string = "",
  socialLinks: Array<{ url: string; icon: string }> = []
): FrameElement => {
  return {
    type: "Frame" as ElementTypes,
    name: "TeamMemberCardHorizontal",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "24px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      width: "100%",
      gap: "24px",
      margin: "0 auto",
    },
    tailwindStyles:
      "flex flex-col sm:flex-row items-center p-4 md:p-6 bg-white rounded-xl shadow-md w-full gap-4 md:gap-6 hover:shadow-lg transition-shadow",
    elements: [
      imageSrc
        ? {
            type: "Image" as ElementTypes,
            content: "Team Member Photo",
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              objectFit: "cover",
              flexShrink: "0",
              border: "3px solid #f1f5f9",
            },
            tailwindStyles:
              "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover shrink-0 border-3 border-slate-100",
            href: "",
            src: imageSrc,
            parentId: "",
            projectId: "",
          }
        : null,
      {
        type: "Frame" as ElementTypes,
        name: "ContentContainer",
        id: uuidv4(),
        content: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          display: "flex",
          flexDirection: "column",
          flex: "1",
        },
        tailwindStyles: "flex flex-col flex-1",
        elements: [
          {
            type: "Text" as ElementTypes,
            content: name,
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontWeight: "bold",
              fontSize: "18px",
              color: "#1e293b",
              marginBottom: "4px",
            },
            tailwindStyles: "font-bold text-lg text-slate-800 mb-1",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text" as ElementTypes,
            content: role,
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "8px",
            },
            tailwindStyles: "text-sm text-slate-500 mb-2",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          {
            type: "Text" as ElementTypes,
            content: bio,
            id: uuidv4(),
            isSelected: false,
            x: 0,
            y: 0,
            styles: {
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "12px",
            },
            tailwindStyles: "text-sm text-slate-500 mb-3",
            href: "",
            src: "",
            parentId: "",
            projectId: "",
          },
          socialLinks.length > 0
            ? {
                type: "Frame" as ElementTypes,
                name: "SocialLinks",
                id: uuidv4(),
                content: "",
                isSelected: false,
                x: 0,
                y: 0,
                styles: {
                  display: "flex",
                  gap: "12px",
                },
                tailwindStyles: "flex gap-3",
                elements: socialLinks.map((social) => ({
                  type: "Link" as ElementTypes,
                  content: social.icon,
                  id: uuidv4(),
                  isSelected: false,
                  x: 0,
                  y: 0,
                  styles: {
                    color: "#64748b",
                    fontSize: "16px",
                    padding: "6px",
                  },
                  tailwindStyles:
                    "text-slate-500 text-base p-1.5 hover:text-slate-800 transition-colors",
                  href: social.url,
                  src: "",
                  parentId: "",
                  projectId: "",
                })),
                href: "",
                src: "",
                parentId: "",
                projectId: "",
              }
            : null,
        ].filter(Boolean) as EditorElement[],
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
    ].filter(Boolean) as EditorElement[],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
};

export const addTeamMember = (
  teamComponent: CustomComponent,
  memberData: {
    name: string;
    role: string;
    bio: string;
    imageSrc?: string;
    socialLinks?: Array<{ url: string; icon: string }>;
  },
  maxMembers: number = 6
): CustomComponent => {
  const isCarousel = teamComponent.component.name?.includes("Carousel");
  const containerName = isCarousel ? "CarouselTrack" : "TeamGrid";
  const layout = teamComponent.component.name?.includes("Horizontal")
    ? "horizontal"
    : teamComponent.component.name?.includes("Vertical")
    ? "vertical"
    : "carousel";

  const container = (teamComponent.component as FrameElement).elements?.find(
    (el) => (el as FrameElement).name === containerName
  ) as FrameElement | undefined;

  if (
    container &&
    container.elements &&
    container.elements.length < maxMembers
  ) {
    let newMember: FrameElement;

    if (layout === "horizontal") {
      newMember = createHorizontalTeamMemberCard(
        memberData.name,
        memberData.role,
        memberData.bio,
        memberData.imageSrc,
        memberData.socialLinks
      );
    } else if (layout === "vertical") {
      newMember = createVerticalTeamMemberCard(
        memberData.name,
        memberData.role,
        memberData.bio,
        memberData.imageSrc,
        memberData.socialLinks
      );
    } else {
      newMember = createTeamMemberCard(
        memberData.name,
        memberData.role,
        memberData.bio,
        memberData.imageSrc,
        memberData.socialLinks
      );
    }

    container.elements.push(newMember);
  } else {
    console.warn(`Cannot add more than ${maxMembers} team members`);
  }

  return teamComponent;
};

export const clearTeamMembers = (
  teamComponent: CustomComponent
): CustomComponent => {
  const isCarousel = teamComponent.component.name?.includes("Carousel");
  const containerName = isCarousel ? "CarouselTrack" : "TeamGrid";

  const container = (teamComponent.component as FrameElement).elements?.find(
    (el) => (el as FrameElement).name === containerName
  ) as FrameElement | undefined;

  if (container && container.elements) {
    container.elements = [];
  }

  return teamComponent;
};

// Default about components
export const aboutDynamicVertical: CustomComponent = createAboutComponent(
  "dynamic",
  "vertical",
  [
    {
      title: "Our Mission",
      description:
        "We are dedicated to providing innovative solutions that make a difference in people's lives.",
      link: "#mission",
      linkText: "Read More",
    },
    {
      title: "Our Team",
      description: "Meet the talented professionals behind our success.",
      imageSrc:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      link: "#team",
      linkText: "Meet the Team",
    },
  ]
);

export const aboutDynamicHorizontal: CustomComponent = createAboutComponent(
  "dynamic",
  "horizontal",
  [
    {
      title: "Our Story",
      description: "From humble beginnings to becoming an industry leader.",
      imageSrc:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#story",
      linkText: "Our Journey",
    },
  ]
);

export const aboutCarouselVertical: CustomComponent = createAboutComponent(
  "carousel",
  "vertical",
  [
    {
      title: "Our Values",
      description:
        "Integrity, innovation, and customer focus drive everything we do.",
      link: "#values",
      linkText: "Learn More",
    },
    {
      title: "Community",
      description: "We believe in giving back to the communities we serve.",
      imageSrc:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      link: "#community",
      linkText: "Our Initiatives",
    },
  ]
);

export const aboutCarouselHorizontal: CustomComponent = createAboutComponent(
  "carousel",
  "horizontal",
  [
    {
      title: "Our Approach",
      description: "A unique methodology that delivers results.",
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#approach",
      linkText: "How We Work",
    },
  ]
);

export const teamMembersComponent1: CustomComponent =
  createTeamMembersComponent("vertical", [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years of industry experience.",
      imageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { url: "https://www.linkedin.com/", icon: "LinkedIn" },
        { url: "#twitter", icon: "Twitter" },
      ],
    },
  ]);

export const teamMembersComponent2: CustomComponent =
  createTeamMembersComponent("horizontal", [
    {
      name: "Alex Johnson",
      role: "Marketing Director",
      bio: "Strategic marketing professional with global brand experience.",
      imageSrc:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { url: "#instagram", icon: "Instagram" },
        { url: "#linkedin", icon: "LinkedIn" },
      ],
    },
  ]);

export const teamMembersComponent3: CustomComponent =
  createTeamMembersComponent("carousel", [
    {
      name: "David Kim",
      role: "Product Manager",
      bio: "Experienced in bringing products from concept to market.",
      imageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ]);
