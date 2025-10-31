import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  profile: string;
  image?: string;
}

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const teamMembers: TeamMember[] = [
    // {
    //   id: "1",
    //   name: "CEO",
    //   designation: "Chief Executive Officer",
    //   profile: "Leading The Kaliber with vision and strategic excellence in hospitality education.",
    //   image: "/api/placeholder/300/300"
    // },
    {
      id: "2",
      name: "Syed Abdullah Bukhari",
      designation: "Operational Manager",
      profile: "International Student Counsellor Tourism & Hospitality Expert. Guiding students beyond borders turning global dreams into real destinations.",
      image: "/images/Abdullah.png"
    },
    {
      id: "3",
      name: "Syeda Zehra Rizvi",
      designation: "Country Sales Director",
      profile: "Global Education Consultant & Sales Strategist. Connecting aspiring students with world-class learning opportunities — building bridges between ambition and achievement.",
      image: "/images/zahra.png"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);


  return (
    <section id="team" className="py-24 bg-gradient-to-b from-kaliber-50 to-white">
      <div className="section-container" ref={sectionRef}>
        <div className="text-center mb-16">
          <div className="reveal opacity-0">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-kaliber-100 text-kaliber-800 uppercase tracking-wide">
              Our Leadership Team
            </span>
            <h2 className="section-heading">
              Meet Our Experts
            </h2>
            <p className="text-kaliber-600 max-w-2xl mx-auto">
              Our dedicated team of professionals brings years of experience in hospitality education 
              and international student services to guide your success.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 justify-items-center max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className="reveal opacity-0"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-kaliber-200">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-kaliber-100">
                      {member.image ? (
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User size={48} className="text-kaliber-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-kaliber-800 mb-2">
                      {member.name}
                    </h3>
                    <Badge variant="secondary" className="mb-4 bg-kaliber-100 text-kaliber-800">
                      {member.designation}
                    </Badge>
                    <p className="text-kaliber-600 leading-relaxed">
                      {member.profile}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;
