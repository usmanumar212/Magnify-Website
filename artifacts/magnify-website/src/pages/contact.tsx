import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  type: z.string({ required_error: "Please select a project type" }),
  budget: z.string({ required_error: "Please select a budget range" }),
  message: z.string().min(10, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Form data:", data);
    toast({
      title: "Thanks — we'll be in touch within 1 business day.",
      duration: 5000,
    });
    form.reset();
  }

  return (
    <div className="min-h-[100dvh] bg-black text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Header />
      
      <main className="pt-32 md:pt-48 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h1 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-5xl md:text-7xl lg:text-[8rem] font-display font-bold leading-[0.9] tracking-tighter mb-24"
            data-testid="contact-hero-heading"
          >
            Let's talk.
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Form Side */}
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="order-2 lg:order-1"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-mono text-xs uppercase tracking-widest">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 font-mono text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-mono text-xs uppercase tracking-widest">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" type="email" className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400 font-mono text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 font-mono text-xs uppercase tracking-widest">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corp" className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white h-12 text-lg" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-400 font-mono text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-mono text-xs uppercase tracking-widest">Project Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus:ring-0 focus:border-white h-12 text-lg text-white">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#111] border-white/10 text-white">
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="app">Mobile App</SelectItem>
                              <SelectItem value="shopify">Shopify</SelectItem>
                              <SelectItem value="software">Software Service</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 font-mono text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70 font-mono text-xs uppercase tracking-widest">Budget</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus:ring-0 focus:border-white h-12 text-lg text-white">
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#111] border-white/10 text-white">
                              <SelectItem value="under10k">Under £10k</SelectItem>
                              <SelectItem value="10k-25k">£10k–£25k</SelectItem>
                              <SelectItem value="25k-50k">£25k–£50k</SelectItem>
                              <SelectItem value="50k+">£50k+</SelectItem>
                              <SelectItem value="unsure">Not sure</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 font-mono text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 font-mono text-xs uppercase tracking-widest">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about what you want to build..." 
                            className="bg-transparent border-t-0 border-x-0 border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white min-h-[120px] text-lg resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 font-mono text-xs" />
                      </FormItem>
                    )}
                  />

                  <button 
                    type="submit" 
                    className="bg-white text-black px-8 py-4 font-medium text-lg hover:bg-white/90 transition-colors w-full sm:w-auto"
                    data-testid="btn-submit-contact"
                  >
                    Submit Enquiry
                  </button>
                </form>
              </Form>
            </motion.div>

            {/* Direct Contact Side */}
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="order-1 lg:order-2 flex flex-col justify-between"
            >
              <div className="mb-16">
                <div className="text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">Direct Email</div>
                <a 
                  href="mailto:hello@magnify.studio" 
                  className="text-3xl md:text-5xl font-display font-medium hover:text-white/70 transition-colors break-words"
                  data-testid="contact-direct-email"
                >
                  hello@magnify.studio
                </a>
              </div>

              <div>
                <div className="text-xs font-mono text-white/40 mb-8 uppercase tracking-widest">Locations</div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-display font-bold mb-2">Birmingham</h4>
                    <p className="text-white/60 font-mono text-sm">United Kingdom</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold mb-2">Abuja</h4>
                    <p className="text-white/60 font-mono text-sm">Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-white/60 font-mono text-sm">
                  We aim to respond to all inquiries within 1 business day.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}