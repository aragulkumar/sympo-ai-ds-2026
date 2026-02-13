import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Pointer } from "@/components/ui/Pointer";
import { MagicCard } from "@/components/ui/MagicCard";

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
}) => (
    <div
        key={name}
        className={cn(
            "group relative col-span-1 flex flex-col justify-between overflow-hidden",
            className
        )}
    >
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
            <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
                {Icon && <Icon className="h-12 w-12 origin-left transform-gpu text-green-400 transition-all duration-300 ease-in-out group-hover:scale-110" />}
                <h3 className="font-orbitron text-xl font-bold text-green-400 group-hover:text-green-300">
                    {name}
                </h3>
                <p className="max-w-lg text-gray-300">{description}</p>
            </div>

            <div className={cn("pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100")}>
                <button
                    onClick={() => window.location.href = href}
                    className="pointer-events-auto font-orbitron text-sm font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 border-2 border-yellow-400 hover:border-yellow-300 px-4 py-2 rounded transition-all"
                >
                    {cta}
                </button>
            </div>
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
            {background && background}
        </MagicCard>
    </div>
);
