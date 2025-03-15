interface beInter {
    id: string;
    title: string;
    audio: any;
}

const BreathExercises: beInter[] = [
    {
        id: "ca1",
        title: "Normal Breath",
        audio: require("../../../../../assets/songs/Mental_Reset_in_5.mp3"),
    },
    {
        id: "ca2",
        title: "Flower Breath",
        audio: require("../../../../../assets/songs/FlowerBreath.mp3"),
    },
    {
        id: "ca3",
        title: "Buble Breath",
        audio: require("../../../../../assets/songs/BubbleBreath.mp3"),
    },
    {
        id: "ca4",
        title: "Bee Breath",
        audio: require("../../../../../assets/songs/BeeBreath.mp3"),
    },
    {
        id: "ca5",
        title: "Ballon Breath",
        audio: require("../../../../../assets/songs/BallonBreath.mp3"),
    },
    {
        id: "ca6",
        title: "HotChocolate Breath",
        audio: require("../../../../../assets/songs/HotChocoBreath.mp3"),
    },
    {
        id: "ca7",
        title: "Dragon Breath",
        audio: require("../../../../../assets/songs/DragonBreath.mp3"),
    },
];

export default BreathExercises;
