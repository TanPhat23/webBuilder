import { CustomComponent } from "../styleconstants";
import { v4 as uuidv4 } from "uuid";

const createAboutCardVertical = (
  title: string = "About Title",
  description: string = "Description about this section.",
  imageSrc: string = "",
  link: string = "",
  linkText: string = "Learn More"
) => {
  return {
    type: "Frame",
    name: "AboutCardVertical",
    id: uuidv4(),
    content: "",
    isSelected: false,
    isDraggable: true,
    dragConstraints: "parent",
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
      width: "100%",
      maxWidth: "300px",
      margin: "0 auto",
    },
    tailwindStyles: "flex flex-col items-center p-5 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc ? {
        type: "Image",
        content: "About Image",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          width: "100%",
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
      } : null,
      {
        type: "Text",
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
        type: "Text",
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
      link ? {
        type: "Link",
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
        tailwindStyles: "text-blue-500 text-sm font-medium px-4 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors",
        href: link,
        src: "",
        parentId: "",
        projectId: "",
      } : null
    ].filter(Boolean), 
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
) => {
  return {
    type: "Frame",
    name: "AboutCardHorizontal",
    id: uuidv4(),
    content: "",
    isSelected: false,
    isDraggable: true,
    dragConstraints: "parent",
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
    tailwindStyles: "flex flex-col sm:flex-row items-center p-5 bg-white rounded-xl shadow-md w-full gap-5 mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc ? {
        type: "Image",
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
      } : null,
      {
        type: "Frame",
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
            type: "Text",
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
            type: "Text",
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
          link ? {
            type: "Link",
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
            tailwindStyles: "text-blue-500 text-sm font-medium px-4 py-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors self-start",
            href: link,
            src: "",
            parentId: "",
            projectId: "",
          } : null
        ].filter(Boolean),
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      }
    ].filter(Boolean),
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
  const aboutCards = limitedCards.map(card => 
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
  const container = {
    type: "Frame",
    name: `About${type.charAt(0).toUpperCase() + type.slice(1)}${layout.charAt(0).toUpperCase() + layout.slice(1)}`,
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
        type: "Text",
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
        type: "Text",
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
      type: "Frame",
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
      tailwindStyles: "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 max-w-6xl",
      elements: aboutCards,
      href: "",
      src: "",
      parentId: "",
      projectId: "",
    });
  } else {
    // Carousel type
    container.elements.push({
      type: "Frame",
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
          type: "Frame",
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
          tailwindStyles: "flex overflow-x-auto scrollbar-hide p-2.5 snap-x snap-mandatory gap-5",
          elements: aboutCards,
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
    });
  }

  return { component: container };
};

// Function to create a team member card
const createTeamMemberCard = (
  name: string = "John Doe",
  role: string = "Position",
  bio: string = "Short biography about the team member.",
  imageSrc: string = "",
  socialLinks: Array<{url: string, icon: string}> = []
) => {
  return {
    type: "Frame",
    name: "TeamMemberCard",
    id: uuidv4(),
    content: "",
    isSelected: false,
    isDraggable: true,
    dragConstraints: "parent",
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
    tailwindStyles: "flex flex-col items-center p-6 bg-white rounded-xl shadow-md w-full max-w-xs mx-auto hover:shadow-lg transition-shadow",
    elements: [
      imageSrc ? {
        type: "Image",
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
        tailwindStyles: "w-32 h-32 rounded-full object-cover mb-5 border-4 border-slate-100",
        href: "",
        src: imageSrc,
        parentId: "",
        projectId: "",
      } : null,
      {
        type: "Text",
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
        tailwindStyles: "font-bold text-lg text-slate-800 mb-1 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text",
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
        tailwindStyles: "text-sm text-slate-500 mb-3 text-center",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Text",
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
        tailwindStyles: "text-sm text-slate-500 text-center mb-4",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      socialLinks.length > 0 ? {
        type: "Frame",
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
        tailwindStyles: "flex gap-3 justify-center",
        elements: socialLinks.map(social => ({
          type: "Link",
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
          tailwindStyles: "text-slate-500 text-base p-2 hover:text-slate-800 transition-colors",
          href: social.url,
          src: "",
          parentId: "",
          projectId: "",
        })),
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      } : null
    ].filter(Boolean),
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  };
};

// Function to create team members component
const createTeamMembersComponent = (
  layout: "grid" | "carousel" = "grid",
  members: Array<{
    name: string;
    role: string;
    bio: string;
    imageSrc?: string;
    socialLinks?: Array<{url: string, icon: string}>;
  }> = [],
  maxMembers: number = 6
): CustomComponent => {
  const limitedMembers = members.slice(0, maxMembers);
  const memberCards = limitedMembers.map(member => 
    createTeamMemberCard(
      member.name,
      member.role,
      member.bio,
      member.imageSrc,
      member.socialLinks
    )
  );

  const container = {
    type: "Frame",
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
    tailwindStyles: "w-full flex flex-col items-center py-16 px-5 bg-slate-50",
    elements: [
      {
        type: "Text",
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
        type: "Text",
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

  if (layout === "grid") {
    container.elements.push({
      type: "Frame",
      name: "TeamGrid",
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
      tailwindStyles: "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl",
      elements: memberCards,
      href: "",
      src: "",
      parentId: "",
      projectId: "",
    });
  } else {
    // Carousel layout
    container.elements.push({
      type: "Frame",
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
          type: "Frame",
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
          tailwindStyles: "flex overflow-x-auto scrollbar-hide p-2.5 snap-x snap-mandatory gap-6",
          elements: memberCards,
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
    });
  }

  return { component: container };
};

// Default about components
export const aboutDynamicVertical: CustomComponent = createAboutComponent(
  "dynamic",
  "vertical",
  [
    {
      title: "Our Mission",
      description: "We are dedicated to providing innovative solutions that make a difference in people's lives.",
      link: "#mission",
      linkText: "Read More"
    },
    {
      title: "Our Team",
      description: "Meet the talented professionals behind our success.",
      imageSrc: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      link: "#team",
      linkText: "Meet the Team"
    }
  ]
);

export const aboutDynamicHorizontal: CustomComponent = createAboutComponent(
  "dynamic",
  "horizontal",
  [
    {
      title: "Our Story",
      description: "From humble beginnings to becoming an industry leader.",
      imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#story",
      linkText: "Our Journey"
    }
  ]
);

export const aboutCarouselVertical: CustomComponent = createAboutComponent(
  "carousel",
  "vertical",
  [
    {
      title: "Our Values",
      description: "Integrity, innovation, and customer focus drive everything we do.",
      link: "#values",
      linkText: "Learn More"
    },
    {
      title: "Community",
      description: "We believe in giving back to the communities we serve.",
      imageSrc: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      link: "#community",
      linkText: "Our Initiatives"
    }
  ]
);

export const aboutCarouselHorizontal: CustomComponent = createAboutComponent(
  "carousel",
  "horizontal",
  [
    {
      title: "Our Approach",
      description: "A unique methodology that delivers results.",
      imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "#approach",
      linkText: "How We Work"
    }
  ]
);

// Default team member components
export const teamMembersComponent1: CustomComponent = createTeamMembersComponent(
  "vertical",
  [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years of industry experience.",
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { url: "https://www.linkedin.com/", icon: "LinkedIn" },
        { url: "#twitter", icon: "Twitter" }
      ]
    },
    {
      name: "John Smith",
      role: "CTO",
      bio: "Tech expert driving our innovative solutions forward.",
      imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { url: "#github", icon: "GitHub" },
        { url: "https://www.linkedin.com/", icon: "LinkedIn" }
      ]
    },
    {
      name: "Emily Chen",
      role: "Design Director",
      bio: "Award-winning designer with an eye for detail and creativity.",
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
    }
  ]
);

export const teamMembersComponent2: CustomComponent = createTeamMembersComponent(
  "carousel",
  [
    {
      name: "Alex Johnson",
      role: "Marketing Director",
      bio: "Strategic marketing professional with global brand experience.",
      imageSrc: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      socialLinks: [
        { url: "#instagram", icon: "Instagram" },
        { url: "#linkedin", icon: "LinkedIn" }
      ]
    },
    {
      name: "Sarah Williams",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in modern web technologies.",
      imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
    }
  ]
);

export const teamMembersComponent3: CustomComponent = createTeamMembersComponent(
  "grid",
  [
    {
      name: "David Kim",
      role: "Product Manager",
      bio: "Experienced in bringing products from concept to market.",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Michael Brown",
      role: "Finance Director",
      bio: "Financial strategist with a focus on sustainable growth.",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Lisa Garcia",
      role: "Customer Success",
      bio: "Dedicated to ensuring our clients achieve their goals.",
      imageSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
    },
    {
      name: "Robert Taylor",
      role: "Sales Manager",
      bio: "Results-driven sales professional with a consultative approach.",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }
  ]
);

// Function to add a new about card to a component
export const addAboutCard = (
  aboutComponent: CustomComponent,
  cardData: {
    title: string;
    description: string;
    imageSrc?: string;
    link?: string;
    linkText?: string;
  },
  layout: "vertical" | "horizontal" = "vertical",
  maxCards: number = 4
): CustomComponent => {
  const isCarousel = aboutComponent.component.name.includes("Carousel");
  const containerName = isCarousel ? "CarouselTrack" : "AboutGrid";
  
  const container = aboutComponent.component.elements.find(
    el => el.name === containerName
  );
  
  if (container && container.elements.length < maxCards) {
    const newCard = layout === "vertical"
      ? createAboutCardVertical(
          cardData.title,
          cardData.description,
          cardData.imageSrc,
          cardData.link,
          cardData.linkText
        )
      : createAboutCardHorizontal(
          cardData.title,
          cardData.description,
          cardData.imageSrc,
          cardData.link,
          cardData.linkText
        );
    
    container.elements.push(newCard);
  } else {
    console.warn(`Cannot add more than ${maxCards} cards`);
  }
  
  return aboutComponent;
};