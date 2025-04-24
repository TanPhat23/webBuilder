import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Github } from "lucide-react";

interface ProfileCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  featured?: boolean;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  role,
  description,
  imageUrl,
  featured = false,
  socialLinks,
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all duration-300 hover:shadow-xl",
        featured && "border-primary shadow-lg relative"
      )}
    >
      {featured && (
        <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2">
          Team Lead
        </Badge>
      )}
      <CardHeader className="flex items-center pt-8">
        <Avatar className="h-32 w-28 mb-4 border-4 border-primary/20">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold mt-2">{name}</h3>
        <CardDescription className="text-center font-medium text-primary/70">{role}</CardDescription>
      </CardHeader>
      <CardContent className="grow text-center px-6">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      {socialLinks && (
        <CardFooter className="flex justify-center gap-4 pb-6">
          {socialLinks.linkedin && (
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-blue-600 hover:bg-blue-100">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </Button>
          )}
          {socialLinks.twitter && (
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-sky-500 hover:bg-sky-100">
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </Button>
          )}
          {socialLinks.github && (
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-gray-900 hover:bg-gray-100">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileCard;
