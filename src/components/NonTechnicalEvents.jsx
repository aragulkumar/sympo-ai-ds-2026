import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";
import { Palette, Gamepad2, Sparkles, Megaphone, Image } from "lucide-react";
import { motion } from "framer-motion";

const NonTechnicalEvents = () => {
    const events = [
        {
            name: "Adapture",
            description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
            Icon: Palette,
            href: "#",
            cta: "Register Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-3xl"
                >
                    🎭
                </motion.div>
            ),
        },
        {
            name: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            Icon: Gamepad2,
            href: "#",
            cta: "Register Now",
            className: "col-span-1 lg:col-span-2",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-500/30 rounded-lg blur-2xl animate-pulse"></div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl"
                >
                    🎮
                </motion.div>
            ),
        },
        {
            name: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            Icon: Sparkles,
            href: "#",
            cta: "Register Now",
            className: "col-span-1 lg:col-span-2",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ y: [0, -8, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                >
                    💄
                </motion.div>
            ),
        },
        {
            name: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            Icon: Megaphone,
            href: "#",
            cta: "Register Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-5 right-5 w-28 h-28 bg-green-500/30 rounded-lg blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                    className="text-3xl"
                >
                    📢
                </motion.div>
            ),
        },
        {
            name: "Decode the Frame",
            description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
            Icon: Image,
            href: "#",
            cta: "Register Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-5 left-5 w-24 h-24 bg-yellow-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="text-3xl"
                >
                    🖼️
                </motion.div>
            ),
        },
    ];

    return (
        <section id="non-technical-events" className="section events-section py-20">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center mb-4">Non-Technical Events</h2>
                <p className="text-center text-gray-400 mb-12 font-orbitron">
                    Entry Fee: ₹75 per head | Winners: ₹500 | Runners-up: ₹400 | E-Certificates for all
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

export default NonTechnicalEvents;
