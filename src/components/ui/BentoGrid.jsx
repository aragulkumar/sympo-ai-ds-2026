import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Pointer } from "./Pointer";
import { MagicCard } from "./MagicCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";

export const BentoGrid = ({ children, className }) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    pointerContent,
    prize,
}) => (
    <div
        key={name}
        className={cn(
            "group relative col-span-1",
            className
        )}
    >
        <Card className="w-full h-full border-none p-0 shadow-none bg-transparent">
            <MagicCard
                className={cn(
                    "flex flex-col justify-between h-full",
                    "bg-gradient-to-br from-black via-gray-900 to-black",
                    "border-2 border-green-500/30",
                    "hover:border-green-500/60",
                    "transition-all duration-300",
                )}
                gradientSize={300}
                gradientColor="#39ff14"
                gradientOpacity={0.3}
            >
                <Pointer>
                    {pointerContent || (
                        <motion.div
                            animate={{
                                scale: [0.8, 1, 0.8],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="text-3xl"
                        >
                            ☢️
                        </motion.div>
                    )}
                </Pointer>

                <CardHeader className="border-b border-green-500/20 p-6 pb-4">
                    <div className="flex items-center gap-4 mb-2">
                        {Icon && (
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <Icon className="h-8 w-8 text-green-400 transition-all duration-300 ease-in-out group-hover:scale-110" />
                            </div>
                        )}
                        <CardTitle className="font-orbitron text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                            {name}
                        </CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="p-6 flex-1">
                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                        {description}
                    </CardDescription>
                    {prize && (
                        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                            <p className="text-yellow-400 font-orbitron text-sm font-semibold">
                                🏆 {prize}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="border-t border-green-500/20 p-6 pt-4">
                    <button
                        onClick={() => window.location.href = href}
                        className="w-full font-orbitron text-sm font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 border-2 border-yellow-400 hover:border-yellow-300 px-4 py-2 rounded transition-all hover:bg-yellow-400/10"
                    >
                        {cta}
                    </button>
                </CardFooter>

                {background && background}
            </MagicCard>
        </Card>
    </div>
);
