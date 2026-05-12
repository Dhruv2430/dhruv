"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail as MailIcon, CheckCircle } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Open mailto with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:dhruvpanchal897@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 500);
  };

  return (
    <section id="contact" className="py-32 relative border-t border-border/40 overflow-hidden">
      {/* Cinematic background mesh */}
      <div className="absolute top-1/2 left-1/4 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: CTA Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-foreground">Open to internships & opportunities</span>
            </div>

            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] mb-8">
              Let&apos;s Build<br/>
              <span className="text-text-muted italic font-sans">Something</span><br/>
              Exceptional.
            </h2>

            <p className="text-xl text-text-muted mb-12 max-w-md font-sans leading-relaxed">
              Whether you need a MERN stack developer for your project or want to discuss a collaboration, I&apos;m ready to connect.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                  <MailIcon size={20} />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-text-muted mb-1">Direct Email</p>
                  <a href="mailto:dhruvpanchal897@gmail.com" className="font-display text-2xl hover:text-primary transition-colors">dhruvpanchal897@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-text-muted mb-1">Based In</p>
                  <p className="font-display text-2xl">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Functional Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[2.5rem] blur-xl -z-10" />
            <div className="bg-background/40 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              {/* Animated subtle glow inside card */}
              <div className="absolute -inset-24 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="font-mono text-xs tracking-widest uppercase text-text-muted">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 font-sans text-lg focus:border-primary focus:outline-none transition-colors placeholder:text-text-muted/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="email" className="font-mono text-xs tracking-widest uppercase text-text-muted">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border py-3 font-sans text-lg focus:border-primary focus:outline-none transition-colors placeholder:text-text-muted/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="message" className="font-mono text-xs tracking-widest uppercase text-text-muted">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-lg focus:border-primary focus:outline-none transition-colors placeholder:text-text-muted/30 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-4 px-8 py-5 bg-foreground text-background rounded-full hover:bg-primary transition-colors duration-300 group/btn overflow-hidden relative disabled:opacity-60"
                >
                  {status === "sent" ? (
                    <>
                      <CheckCircle size={18} className="relative z-10 text-primary" />
                      <span className="relative z-10 font-sans font-medium text-lg">Opening Email Client...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10 font-sans font-medium text-lg">
                        {status === "sending" ? "Sending..." : "Send Message"}
                      </span>
                      <Send size={18} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
