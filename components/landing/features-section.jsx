import { Search, Shield, Zap, Globe, BarChart3, MessageSquare } from "lucide-react"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Advanced filters and AI-powered matching to find the perfect candidates or opportunities.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All profiles are verified to ensure authenticity and build trust in the platform.",
  },
  {
    icon: Zap,
    title: "Instant Connect",
    description: "One-click connection with candidates or employers. No more waiting.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access talent and opportunities from around the world in one platform.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your profile views, applications, and engagement metrics.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description: "Built-in messaging system for seamless communication.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Powerful features designed to streamline your hiring process or job search journey.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger faster className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <FadeIn key={index}>
                <div
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </FadeIn>
            )
          })}
        </FadeInStagger>
      </div>
    </section>
  )
}
