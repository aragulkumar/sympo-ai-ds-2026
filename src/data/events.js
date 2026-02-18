import { FlaskConical, Binary, Atom, Wrench, Ghost, Gamepad2, Pipette, Megaphone, Eye, UtensilsCrossed, Dumbbell, Droplet, Music, Film } from "lucide-react";

export const technicalEvents = [
    {
        id: "visual-paper-expo",
        title: "Visual Paper Expo",
        description: "Showcase your innovative prototypes and engineering marvels in this exciting exhibition.",
        icon: FlaskConical,
        prize: "₹1500 / ₹1000 / ₹500 + Certification",
        fee: "Free Entry",
        team: "1 to 3 Members",
        rules: [
            "Presentations should be maximum 10 minutes.",
            "Bring your own hardware/prototypes if applicable.",
            "Judges' decision is final."
        ],
        guidelines: [
            "Technical accuracy is paramount.",
            "Visual aids are encouraged.",
            "Innovative approach highly valued."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "algo-fest",
        title: "Algo Fest",
        description: "Present your research papers and innovative ideas to expert judges and win exciting prizes.",
        icon: Binary,
        prize: "₹1500 / No refund",
        fee: "₹150",
        team: "1 to 5 Members",
        rules: [
            "Abstract submission is required beforehand.",
            "Max 5 members per team.",
            "Time limit for presentation is 12 mins."
        ],
        guidelines: [
            "Focus on algorithmic efficiency.",
            "Clarity of problem statement.",
            "Originality check will be performed."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "neural-knockout",
        title: "Neural Knockout",
        description: "Test your technical knowledge and quick thinking in this ultimate tech quiz battle.",
        icon: Atom,
        prize: "₹1500 / ₹1000 / ₹500 + Certification",
        fee: "Free Entry",
        team: "1 to 2 Members",
        rules: [
            "Preliminary round for shortlisting.",
            "No electronic gadgets allowed during rounds.",
            "Rapid fire round is a knockout phase."
        ],
        guidelines: [
            "General technical awareness required.",
            "Be quick to buzz.",
            "Teamwork is key."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "technovate",
        title: "Technovate",
        description: "Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.",
        icon: Wrench,
        prize: "Winner: ₹500",
        fee: "₹100 per team",
        team: "2-4 Members",
        rules: [
            "Prototype must be working or a logical model.",
            "Innovation in sustainability is a plus.",
            "Team must submit a project report."
        ],
        guidelines: [
            "Focus on real-world problem solving.",
            "Feasibility is a major judging criteria.",
            "Effective presentation of the project."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
];

export const nonTechnicalEvents = [
    {
        id: "adapture",
        title: "Adapture",
        description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
        icon: Ghost,
        prize: "₹500 / ₹400",
        fee: "₹75 per head",
        team: "Individual",
        rules: [
            "Scenarios will be given on the spot.",
            "Maximum time 5 mins per person.",
            "Creativity and logic are both tested."
        ],
        guidelines: [
            "Be prepared for anything.",
            "Don't hesitate to think outside the box.",
            "Communication skills are vital."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "heisenbergs-last-stand",
        title: "Heisenberg's Last Stand",
        description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
        icon: Gamepad2,
        prize: "₹500 / ₹400",
        fee: "₹75 per head",
        team: "Squad (4 Members)",
        rules: [
            "Bring your own gadgets (phones/tab).",
            "Internet will be provided (or use own).",
            "Use of hacks leads to immediate disqualification."
        ],
        guidelines: [
            "Effective communication within the squad.",
            "Strategic gameplay is more important than raw skills.",
            "Stay alive at all costs."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "beauty-glitz",
        title: "Beauty Glitz",
        description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
        icon: Pipette,
        prize: "₹500 / ₹400",
        fee: "₹75 per head",
        team: "Individual or Pair",
        rules: [
            "Bring your own makeup kits.",
            "Time limit 45 minutes.",
            "Theme will be announced at the start."
        ],
        guidelines: [
            "Focus on blending and precision.",
            "Adherence to the theme.",
            "Hygienic practices."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "heisenpitch",
        title: "Heisenpitch",
        description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
        icon: Megaphone,
        prize: "₹500 / ₹400",
        fee: "₹75 per head",
        team: "1-3 Members",
        rules: [
            "Product will be provided to pitch.",
            "3 minutes for prep, 5 minutes for pitching.",
            "Persuasion is the key goal."
        ],
        guidelines: [
            "Be convincing.",
            "Understand the target audience.",
            "Unique selling propositions should be clear."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "decode-the-frame",
        title: "Decode the Frame",
        description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
        icon: Eye,
        prize: "₹500 / ₹400",
        fee: "₹75 per head",
        team: "Individual",
        rules: [
            "Series of rounds with increasing difficulty.",
            "Fastest finger first for some rounds.",
            "Points based on accuracy and speed."
        ],
        guidelines: [
            "Observation skills are critical.",
            "Broad knowledge of cinema/pop culture helps.",
            "Stay sharp."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
];

export const funGames = [
    {
        id: "who-eats-more",
        title: "Who Eats More?",
        description: "Pani Puri Edition - Test your eating speed and capacity in this delicious challenge. Can you handle the heat?",
        icon: UtensilsCrossed,
        prize: "Exciting Rewards!",
        fee: "₹50 per head",
        team: "Individual",
        rules: [
            "Time limit of 3 minutes.",
            "Don't waste the food.",
            "Cleanliness during eating is noted."
        ],
        guidelines: [
            "Pace yourself.",
            "Be prepared for spice.",
            "Have fun!"
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "battle-of-endurance",
        title: "Battle of Endurance",
        description: "Push-up challenge to test your physical strength and stamina. Show your endurance and compete for glory!",
        icon: Dumbbell,
        prize: "Exciting Rewards!",
        fee: "₹50 per head",
        team: "Individual",
        rules: [
            "Standard form must be maintained.",
            "Count stops once form breaks.",
            "Rest time limit between reps."
        ],
        guidelines: [
            "Focus on technique over speed.",
            "Control your breathing.",
            "Don't push through injury."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "splash-clash",
        title: "Splash Clash",
        description: "Cup splash water game - Precision, precision, and a bit of luck. Get ready to make a splash!",
        icon: Droplet,
        prize: "Exciting Rewards!",
        fee: "₹50 per head",
        team: "Individual",
        rules: [
            "Aim for the targets.",
            "Don't exceed your water quota.",
            "Fastest time wins."
        ],
        guidelines: [
            "Steady hand wins.",
            "Calculate your splashes.",
            "Keep the arena clean."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "track-the-tune",
        title: "Track the Tune",
        description: "Song identification challenge. Test your music knowledge and identify songs from short clips.",
        icon: Music,
        prize: "Exciting Rewards!",
        fee: "₹50 per head",
        team: "Individual or Pair",
        rules: [
            "Identify song title and artist.",
            "First one to buzz gets the chance.",
            "Bonus for extra details."
        ],
        guidelines: [
            "Listen closely to the melody.",
            "Recall lyrics tags.",
            "Wide music taste is an advantage."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
    {
        id: "heisen-guess",
        title: "Heisen Guess",
        description: "Movie identification game. Guess the movie from clues, scenes, or dialogues. Are you a true cinephile?",
        icon: Film,
        prize: "Exciting Rewards!",
        fee: "₹50 per head",
        team: "Individual",
        rules: [
            "Guessing based on visual/audio clues.",
            "Limit on number of wrong guesses.",
            "Round-robin format."
        ],
        guidelines: [
            "Pay attention to details in scenes.",
            "Identify lead actors quickly.",
            "Be fast."
        ],
        gformUrl: "https://docs.google.com/forms/d/e/1FAIpQLS..."
    },
];

export const allItems = [...technicalEvents, ...nonTechnicalEvents, ...funGames];
