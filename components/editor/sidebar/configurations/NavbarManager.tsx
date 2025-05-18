import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, ChevronDown, Plus, Trash2, Settings, ExternalLink, AlertCircle, Youtube } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { EditorElement } from "@/lib/type";
import { FrameElement } from "@/lib/interface";
import { toast } from "sonner";

interface NavLinkProps {
  id: string;
  content: string;
  href: string;
  isSelected: boolean;
  originalElement: EditorElement;
}

const NavbarManager = () => {
  const { selectedElement } = useElementSelectionStore();
  const { updateElementOptimistically } = useEditorStore();
  const [navLinks, setNavLinks] = useState<NavLinkProps[]>([]);
  const [newLinkText, setNewLinkText] = useState("");
  const [newLinkHref, setNewLinkHref] = useState("/");
  const [editingLink, setEditingLink] = useState<NavLinkProps | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [debugMessage, setDebugMessage] = useState<string | null>(null);

  const extractYoutubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*(youtube\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeVideoId = extractYoutubeVideoId(newLinkHref);
  
  const editingYoutubeVideoId = editingLink ? extractYoutubeVideoId(editingLink.href) : null;

  const extractedLinks = React.useMemo(() => {
    if (selectedElement && selectedElement.type === "Frame") {
      try {
        const frameElement = selectedElement as FrameElement;
        const extractedLinks = extractNavLinks(frameElement);
        if (navLinks.length === 0 && extractedLinks.length > 0) {
          setNavLinks(extractedLinks);
        }
        setDebugMessage(null);
        return extractedLinks;
      } catch (error) {
        console.error("Error extracting nav links:", error);
        setDebugMessage(`Error extracting links: ${(error as Error).message}`);
      }
    }
    return [];
  }, [selectedElement]);

  const extractNavLinks = (element: FrameElement): NavLinkProps[] => {
    if (!element || !element.elements) {
      return [];
    }
    
    let links: EditorElement[] = [];
    
    const directLinks = (element.elements || []).filter(el => el.type === "Link");
    
    const linkContainers = (element.elements || []).filter(
      (el) => {
        if (el.type !== "Frame") return false;
        
        const frameEl = el as FrameElement;
        return (
          (frameEl.name && (
            frameEl.name.toLowerCase().includes('link') || 
            frameEl.name.toLowerCase().includes('nav') || 
            frameEl.name.toLowerCase().includes('menu')
          )) ||
          (frameEl.elements && frameEl.elements.some((child: EditorElement) => child.type === "Link"))
        );
      }
    ) as FrameElement[];
    
    const nestedLinks: EditorElement[] = [];
    linkContainers.forEach(container => {
      if (container.elements) {
        const containerLinks = container.elements.filter(el => el.type === "Link");
        nestedLinks.push(...containerLinks);
      }
    });
    
    links = [...directLinks, ...nestedLinks];
    
    const uniqueLinks = links.filter((link, index, self) => 
      index === self.findIndex(l => l.id === link.id)
    );
    
    return uniqueLinks.map((link) => ({
      id: link.id,
      content: link.content || "",
      href: link.href || "/",
      isSelected: link.isSelected || false,
      originalElement: { ...link }
    }));
  };

  const handleAddLink = () => {
    if (!newLinkText.trim()) return;
    
    try {
      const newLink = {
        id: uuidv4(),
        content: newLinkText,
        href: newLinkHref || "/",
        isSelected: false,
        originalElement: null as any
      };

      const updatedLinks = [...navLinks, newLink];
      setNavLinks(updatedLinks);
      updateNavbarLinks(updatedLinks);
      
      setNewLinkText("");
      setNewLinkHref("/");
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Error adding link", {
        description: (error as Error).message
      });
    }
  };

  const handleRemoveLink = (id: string) => {
    try {
      const updatedLinks = navLinks.filter(link => link.id !== id);
      setNavLinks(updatedLinks);
      updateNavbarLinks(updatedLinks);
    } catch (error) {
      console.error("Error removing link:", error);
      toast.error("Error removing link", {
        description: (error as Error).message
      });
    }
  };

  const handleEditLink = (link: NavLinkProps) => {
    setEditingLink(link);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingLink) return;
    
    try {
      const updatedLinks = navLinks.map(link => 
        link.id === editingLink.id ? editingLink : link
      );
      
      setNavLinks(updatedLinks);
      updateNavbarLinks(updatedLinks);
      setIsEditDialogOpen(false);
      setEditingLink(null);
    } catch (error) {
      console.error("Error saving link edit:", error);
      toast.error("Error saving changes", {
        description: (error as Error).message
      });
    }
  };

  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === navLinks.length - 1)
    ) {
      return;
    }

    try {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const updatedLinks = [...navLinks];
      [updatedLinks[index], updatedLinks[newIndex]] = [updatedLinks[newIndex], updatedLinks[index]];
      
      setNavLinks(updatedLinks);
      updateNavbarLinks(updatedLinks);
    } catch (error) {
      console.error("Error moving link:", error);
      toast.error("Error changing link order", {
        description: (error as Error).message
      });
    }
  };

  const updateNavbarLinks = (updatedLinks: NavLinkProps[]) => {
    if (!selectedElement || selectedElement.type !== "Frame") return;
    
    const frameElement = selectedElement as FrameElement;
    if (!frameElement.elements) {
      frameElement.elements = [];
    }
    
    const linkContainerIndices = frameElement.elements
      .map((el, index) => {
        if (el.type !== "Frame") return -1;
        const frameEl = el as FrameElement;
        return frameEl.elements?.some((child: EditorElement) => child.type === "Link") ? index : -1;
      })
      .filter(index => index !== -1);
    
    const directLinkIndices = frameElement.elements
      .map((el, index) => el.type === "Link" ? index : -1)
      .filter(index => index !== -1);
    
    let templateLink: EditorElement | null = null;
    
    for (const link of updatedLinks) {
      if (link.originalElement) {
        templateLink = link.originalElement;
        break;
      }
    }
    
    if (!templateLink) {
      for (const index of linkContainerIndices) {
        const container = frameElement.elements[index] as FrameElement;
        const firstLink = container.elements?.find(el => el.type === "Link");
        if (firstLink) {
          templateLink = firstLink;
          break;
        }
      }
      
      if (!templateLink && directLinkIndices.length > 0) {
        templateLink = frameElement.elements[directLinkIndices[0]];
      }
    }
    
    const defaultStyles = {
      color: "#333",
      fontSize: "16px",
      padding: "8px 16px",
      margin: "0 5px",
      display: "inline-block",
      textDecoration: "none",
    };
    
    const newLinkElements = updatedLinks.map(link => {
      if (link.originalElement) {
        return {
          ...link.originalElement,
          content: link.content,
          href: link.href,
          isSelected: link.isSelected,
        };
      }
      
      return {
        type: "Link" as const,
        content: link.content,
        id: link.id,
        isSelected: link.isSelected,
        x: 0,
        y: 0,
        styles: templateLink?.styles || defaultStyles,
        tailwindStyles: templateLink?.tailwindStyles || "text-gray-800 hover:text-gray-900 px-4 py-2",
        href: link.href,
        src: "",
        parentId: "",
        projectId: frameElement.projectId || "",
      };
    });
    
    if (linkContainerIndices.length > 0) {
      const containerIndex = linkContainerIndices[0];
      const container = frameElement.elements[containerIndex] as FrameElement;
      
      const nonLinkElements = container.elements?.filter(el => el.type !== "Link") || [];
      
      const updatedContainer = {
        ...container,
        elements: [...nonLinkElements, ...newLinkElements.map(el => ({
          ...el,
          parentId: container.id
        }))],
      };
      
      const updatedElements = [...frameElement.elements];
      updatedElements[containerIndex] = updatedContainer;
      
      updateElementOptimistically(frameElement.id, {
        elements: updatedElements,
      });
    } else if (directLinkIndices.length > 0) {
      const nonLinkElements = frameElement.elements.filter(el => el.type !== "Link");
      
      const updatedElements = [...nonLinkElements, ...newLinkElements];
      
      updateElementOptimistically(frameElement.id, {
        elements: updatedElements,
      });
    } else {
      const updatedElements = [...frameElement.elements, ...newLinkElements];
      
      updateElementOptimistically(frameElement.id, {
        elements: updatedElements,
      });
    }
  };

  const renderLinksList = () => {
    if (navLinks.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          No navigation links found. Add your first link below.
        </div>
      );
    }

    return (
      <div className="space-y-2 mt-2">
        {navLinks.map((link, index) => (
          <div 
            key={link.id} 
            className="flex items-center justify-between p-2 border rounded-md bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-medium truncate">{link.content}</span>
              <span className="text-xs text-gray-500 truncate">{link.href}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleMoveLink(index, 'up')}
                disabled={index === 0}
                className="h-7 w-7"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleMoveLink(index, 'down')}
                disabled={index === navLinks.length - 1}
                className="h-7 w-7"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditLink(link)}
                className="h-7 w-7"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveLink(link.id)}
                className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const YoutubePreview = ({ videoId }: { videoId: string }) => {
    return (
      <div className="mt-3 border rounded-md overflow-hidden bg-black">
        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="bg-gray-100 p-2 flex items-center gap-2">
          <Youtube className="h-4 w-4 text-red-600" />
          <span className="text-xs font-medium">YouTube Video Preview</span>
        </div>
      </div>
    );
  };

  if (!selectedElement || selectedElement.type !== "Frame") {
    return (
      <div className="p-4 text-center text-gray-500">
        Please select a navbar component to manage navigation links.
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4">
      
      {debugMessage && (
        <div className="p-2 border border-red-300 bg-red-50 rounded text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>{debugMessage}</div>
        </div>
      )}
      
      <Accordion type="single" collapsible className="w-full" defaultValue="links">
        <AccordionItem value="links">
          <AccordionTrigger className="text-sm py-2">
            Manage Navigation Links
          </AccordionTrigger>
          <AccordionContent>
            {renderLinksList()}
            
            <div className="mt-4 space-y-3 pt-3 border-t">
              <div className="space-y-1">
                <Label htmlFor="linkText" className="text-xs">Link Text</Label>
                <Input
                  id="linkText"
                  value={newLinkText}
                  onChange={(e) => setNewLinkText(e.target.value)}
                  placeholder="e.g. Home, About, Contact"
                  className="h-8 text-xs"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="linkHref" className="text-xs">Link URL</Label>
                <Input
                  id="linkHref"
                  value={newLinkHref}
                  onChange={(e) => setNewLinkHref(e.target.value)}
                  placeholder="e.g. /about"
                  className="h-8 text-xs"
                />
              </div>
              
              {youtubeVideoId && <YoutubePreview videoId={youtubeVideoId} />}
              
              <Button 
                onClick={handleAddLink} 
                disabled={!newLinkText.trim()}
                className="w-full h-8 text-xs gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Navigation Link
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Edit Link Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Navigation Link</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editLinkText" className="text-sm">Link Text</Label>
              <Input
                id="editLinkText"
                value={editingLink?.content || ""}
                onChange={(e) => setEditingLink(prev => prev ? {...prev, content: e.target.value} : null)}
                className="h-9"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="editLinkHref" className="text-sm">Link URL</Label>
              <div className="flex">
                <Input
                  id="editLinkHref"
                  value={editingLink?.href || ""}
                  onChange={(e) => setEditingLink(prev => prev ? {...prev, href: e.target.value} : null)}
                  className="h-9 rounded-r-none"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 rounded-l-none"
                  title="Test link"
                  onClick={() => {
                    if (editingLink?.href) {
                      window.open(editingLink.href, '_blank');
                    }
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {editingYoutubeVideoId && <YoutubePreview videoId={editingYoutubeVideoId} />}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavbarManager;