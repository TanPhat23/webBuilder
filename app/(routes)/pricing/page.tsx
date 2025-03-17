import PricingCard from "@/components/pricing/PricingCard";
import PricingFaq from "@/components/pricing/PricingFaq";
import PricingComparison from "@/components/pricing/PricingComparision";

export const metadata = {
  title: "Pricing | Your SaaS",
  description: "Simple, transparent pricing for all your needs",
};
const PricingPage = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          What will you pay?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always know what you will pay.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <PricingCard
          title="Starter"
          price="$9"
          description="Perfect for individuals and small projects."
          features={[
            "Up to 3 projects",
            "1 team member",
            "5GB storage",
            "Basic support",
          ]}
          buttonText="Get Started"
          buttonVariant="outline"
        />
        <PricingCard
          title="Pro"
          price="$29"
          description="Ideal for growing teams and businesses."
          features={[
            "Up to 10 projects",
            "5 team members",
            "25GB storage",
            "Priority support",
            "Advanced analytics",
          ]}
          buttonText="Get Started"
          buttonVariant="default"
          popular={true}
        />
        <PricingCard
          title="Enterprise"
          price="$99"
          description="For large organizations with advanced needs."
          features={[
            "Unlimited projects",
            "Unlimited team members",
            "100GB storage",
            "24/7 dedicated support",
            "Advanced analytics",
            "Export web",
          ]}
          buttonText="Contact Sales"
          buttonVariant="outline"
        />
      </div>

      <PricingComparison />
      <PricingFaq />
    </div>
  );
};

export default PricingPage;
