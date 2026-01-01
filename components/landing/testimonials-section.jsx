import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"

const testimonials = [
  {
    quote:
      "TalentHub helped me find my dream job in just 2 weeks. The platform is intuitive and the quality of opportunities is unmatched.",
    author: "Sarah Chen",
    role: "Senior Developer at Google",
    avatar: "/professional-woman-developer.png",
  },
  {
    quote:
      "As an employer, I've never had an easier time finding qualified candidates. The filtering system is incredibly powerful.",
    author: "Michael Roberts",
    role: "HR Director at Stripe",
    avatar: "/professional-man-hr-manager.jpg",
  },
  {
    quote:
      "The profile builder helped me showcase my skills in a way that got me noticed. I received 3 offers within a month!",
    author: "Emily Johnson",
    role: "Product Designer at Figma",
    avatar: "/professional-woman-designer.png",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Loved by professionals worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our users have to say about their experience with TalentHub.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} className="h-full">
              <div className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 text-pretty flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}
