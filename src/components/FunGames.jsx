import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { UtensilsCrossed, Dumbbell, Droplet, Music, Film } from "lucide-react";
import { motion } from "framer-motion";

const FunGames = () => {
    const games = [
        {
            name: "Who Eats More?",
            description: "Pani Puri Edition - Test your eating speed and capacity in this delicious challenge. Can you handle the heat?",
            Icon: UtensilsCrossed,
            href: "#",
            cta: "Join Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-24 h-24 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-3xl"
                >
                    🥟
                </motion.div>
            ),
        },
        {
            name: "Battle of Endurance",
            description: "Push-up challenge to test your physical strength and stamina. Show your endurance and compete for glory!",
            Icon: Dumbbell,
            href: "#",
            cta: "Join Now",
            className: "col-span-1 lg:col-span-2",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-500/20 rounded-lg blur-2xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl"
                >
                    💪
                </motion.div>
            ),
        },
        {
            name: "Splash Clash",
            description: "Cup splash water game - Precision, timing, and a bit of luck. Get ready to make a splash!",
            Icon: Droplet,
            href: "#",
            cta: "Join Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-5 right-5 w-28 h-28 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-3xl"
                >
                    💧
                </motion.div>
            ),
        },
        {
            name: "Track the Tune",
            description: "Song identification challenge. Test your music knowledge and identify songs from short clips.",
            Icon: Music,
            href: "#",
            cta: "Join Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-5 left-5 w-24 h-24 bg-yellow-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-3xl"
                >
                    🎵
                </motion.div>
            ),
        },
        {
            name: "Heisen Guess",
            description: "Movie identification game. Guess the movie from clues, scenes, or dialogues. Are you a true cinephile?",
            Icon: Film,
            href: "#",
            cta: "Join Now",
            className: "col-span-1",
            background: (
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                </div>
            ),
            pointerContent: (
                <motion.div
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="text-3xl"
                >
                    🎬
                </motion.div>
            ),
        },
    ];

    return (
        <section id="fun-games" className="section events-section py-20">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-center mb-4">Fun Games</h2>
                <p className="text-center text-gray-400 mb-12 font-orbitron">
                    Entry Fee: ₹50 per head | Winners receive exciting rewards!
                </p>
                <BentoGrid>
                    {games.map((game) => (
                        <BentoCard key={game.name} {...game} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};

export default FunGames;
