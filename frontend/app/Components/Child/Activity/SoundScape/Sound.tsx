interface Sounds {
    subtitle: string;
    lottie: any;
    audio: any;
}

interface SoundInter {
    id: string;
    title: string;
    sound1: Sounds;
    sound2: Sounds;
}

const Sound: SoundInter[] = [
    {
        id: "ca8",
        title: "Rainfall & Wind Through Trees",
        sound1: {
            subtitle: "Rainfall",
            lottie: require("../../../../../assets/lottie/Rain.json"),
            audio: require("../../../../../assets/songs/RainMusic.mp3"),
        },
        sound2: {
            subtitle: "Wind Through Trees",
            lottie: require("../../../../../assets/lottie/Wind.json"),
            audio: require("../../../../../assets/songs/WindMusic.mp3"),
        },
    },
    {
        id: "ca9",
        title: "Ocean Waves & Flute Music",
        sound1: {
            subtitle: "Ocean Waves",
            lottie: require("../../../../../assets/lottie/Ocean.json"),
            audio: require("../../../../../assets/songs/OceanMusic.mp3"),
        },
        sound2: {
            subtitle: "Flute Music",
            lottie: require("../../../../../assets/lottie/Flute.json"),
            audio: require("../../../../../assets/songs/FluteMusic.mp3"),
        },
    },
    {
        id: "ca10",
        title: "Birds Chirping & Flowing River",
        sound1: {
            subtitle: "Birds Chirping",
            lottie: require("../../../../../assets/lottie/Bird.json"),
            audio: require("../../../../../assets/songs/BirdMusic.mp3"),
        },
        sound2: {
            subtitle: "Flowing River",
            lottie: require("../../../../../assets/lottie/River.json"),
            audio: require("../../../../../assets/songs/RainMusic.mp3"),
        },
    },
];

export default Sound;
