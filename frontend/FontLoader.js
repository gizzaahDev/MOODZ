import React, { useState, useEffect } from "react";
import * as Font from "expo-font";

export default function FontLoader({ children }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                asul: require("./assets/fonts/Asul-Regular.ttf"),
                spacemono: require("./assets/fonts/SpaceMono-Regular.ttf"),
                poppins: require("./assets/fonts/Poppins-Regular.ttf"),
                poppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
                poppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
                poppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
                times: require("./assets/fonts/times.ttf"),
                roboto: require("./assets/fonts/Roboto-Regular.ttf"),
                robotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
                robotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null; // Or a loading spinner, if desired
    }

    return children;
}
