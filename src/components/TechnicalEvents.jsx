import { BentoCard, BentoGrid } from "./ui/BentoGrid";
import { Code, Cpu, Brain, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const TechnicalEvents = () => {
    const events = [
        {
            name: "Visual Paper Expo",
            description: "Present your innovative research ideas through stunning visual paper presentations. Showcase your technical knowledge and creativity.",
            Icon: Code,
            href: "#",
            cta: "Register Now",
            prize: "Winner: ₹500",
            className: "col-span-1 lg:col-span-2",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse delay-700"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ scale: [0.8, 1, 0.8], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                >
                    📄
                </motion.div>
            ),
        },
        {
            name: "Algo Fest",
            description: "Put your algorithmic skills to the test. Solve complex problems, optimize code, and compete with the best minds.",
            Icon: Cpu,
            href: "#",
            cta: "Register Now",
            prize: "Winner: ₹500",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-5 right-5 w-24 h-24 bg-green-500/30 rounded-lg blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl"
                >
                    💻
                </motion.div>
            ),
        },
        {
            name: "Neural Knockout",
            description: "Code debugging quiz with a neural twist. Test your debugging skills and technical knowledge in this knockout competition.",
            Icon: Brain,
            href: "#",
            cta: "Register Now",
            prize: "Winner: ₹500",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-5 left-5 w-28 h-28 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-3xl"
                >
                    🧠
                </motion.div>
            ),
        },
        {
            name: "Technovate",
            description: "Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.",
            Icon: Lightbulb,
            href: "#",
            cta: "Register Now",
            prize: "Winner: ₹500",
            className: "col-span-1 lg:col-span-2",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-3xl"
                >
                    💡
                </motion.div>
            ),
        },
    ];

    return (
        <section id="technical-events" className="section events-section py-20">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center mb-4">Technical Events</h2>
                <p className="text-center text-gray-400 mb-12 font-orbitron">
                    Entry Fee: ₹100 per team | All participants receive E-Certificates
                </p>
                <BentoGrid>
                    {events.map((event) => (
                        <BentoCard key={event.name} {...event} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};

export default TechnicalEvents;
