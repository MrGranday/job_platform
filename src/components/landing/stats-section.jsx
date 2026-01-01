import { FadeIn, FadeInStagger } from "@/components/ui/fade-in";
const stats = [
    { value: "50K+", label: "Active Professionals" },
    { value: "10K+", label: "Companies Hiring" },
    { value: "100K+", label: "Successful Matches" },
    { value: "95%", label: "Satisfaction Rate" },
];
export function StatsSection() {
    return (<section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (<FadeIn key={index}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            </FadeIn>))}
        </FadeInStagger>
      </div>
    </section>);
}
