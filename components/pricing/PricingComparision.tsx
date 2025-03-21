import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PricingComparison: React.FC = () => {
  const features = [
    { name: "Projects", starter: "3", pro: "10", enterprise: "Unlimited" },
    { name: "Team members", starter: "1", pro: "5", enterprise: "Unlimited" },
    { name: "Storage", starter: "5GB", pro: "25GB", enterprise: "100GB" },
    { name: "API access", starter: false, pro: true, enterprise: true },
    { name: "Custom domain", starter: false, pro: true, enterprise: true },
    {
      name: "Analytics",
      starter: "Basic",
      pro: "Advanced",
      enterprise: "Advanced",
    },
    {
      name: "Support",
      starter: "Email",
      pro: "Priority",
      enterprise: "24/7 dedicated",
    },
    {
      name: "Export web",
      starter: false,
      pro: false,
      enterprise: true,
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Feature</TableHead>
              <TableHead>Starter</TableHead>
              <TableHead>Pro</TableHead>
              <TableHead>Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell>
                  {typeof feature.starter === "boolean" ? (
                    feature.starter ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )
                  ) : (
                    feature.starter
                  )}
                </TableCell>
                <TableCell>
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )
                  ) : (
                    feature.pro
                  )}
                </TableCell>
                <TableCell>
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground" />
                    )
                  ) : (
                    feature.enterprise
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PricingComparison;
