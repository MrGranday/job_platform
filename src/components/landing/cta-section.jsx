import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function CTASection() {
    return (<section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 sm:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"/>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"/>

          <FadeIn>
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
                Ready to take your career to the next level?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
                Join thousands of professionals who have already found success with TalentHub. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 h-12 text-base">
                    Create Your Profile
                    <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </Link>
                <Link to="/search">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-12 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                    Browse Talent
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>);
}