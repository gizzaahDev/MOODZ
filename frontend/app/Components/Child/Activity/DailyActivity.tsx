import { View, Text } from "react-native";
import React from "react";
import Activity from "./Activity";
import { useRouter } from "expo-router";

const activityData = [
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 2,
        activityId: "ca12",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca12" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 2,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 2,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 3,
        activityId: "ca13",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca13" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 3,
        activityId: "",
        title: "Breathing Exercise 3",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 3,
        activityId: "ca8",
        title: "Sound Scaping 3",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 4,
        activityId: "ca14",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca14" },
        circleColor: "green",
    },
    {
        id: "da3",
        day: 4,
        activityId: "ca8",
        title: "Sound Scaping 3",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da3",
        day: 4,
        activityId: "ca8",
        title: "Sound Scaping 3",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
    {
        id: "da1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
    },
    {
        id: "da2",
        day: 1,
        activityId: "",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
    },
    {
        id: "da3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
    },
];

interface daProps{
    pressDay: number
}

const DailyActivity:React.FC<daProps> = ({pressDay}) => {
    const router = useRouter();

    // filter activity by day
    const filterTasks = activityData.filter(
        (item) => item.day === pressDay
    );

    return (
        <View style={{ flex: 1 }}>
            {filterTasks.map((item) => {
                return (
                    <Activity
                        key={item.id}
                        id={item.id}
                        day={item.day}
                        title={item.title}
                        subtitle={item.subtitle}
                        onPress={() =>
                            router.push({
                                pathname: item.pathname,
                                params: item.params,
                            })
                        }
                        circleColor={item.circleColor}
                    />
                );
            })}
        </View>
    );
};

export default DailyActivity;
