import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { createStyleSheet } from "react-native-unistyles";
import { router } from "expo-router";

// Define the type for the arrow states
type ArrowState = {
    arrow1: boolean;
    arrow2: boolean;
    arrow3: boolean;
    arrow4: boolean;
    arrow5: boolean;
};

const WHOMy5MomentsForHandHygieneVideos = [
    {
        videoUrl: 'https://www.youtube.com/embed/dAjZjBvgcF4'
    },
    {
        videoUrl: 'https://www.youtube.com/embed/w-kCfuzpxSM',
    },
    {
        videoUrl: 'https://www.youtube.com/embed/Lum4dP_fn-k'
    },
    {
        videoUrl: 'https://www.youtube.com/embed/xKuy9CWRhPE'
    },
    {
        videoUrl: 'https://www.youtube.com/embed/61shxMyxTo0'
    }
]

const WHOMy5MomentsForHandHygiene = () => {
    // Initialize the arrow states
    const [arrows, setArrows] = useState<ArrowState>({
        arrow1: false,
        arrow2: false,
        arrow3: false,
        arrow4: false,
        arrow5: false,
    });

    // Define the handlePress function to toggle the arrow states
    const handlePress = (arrow: keyof ArrowState) => () => {
        setArrows(() => {
            // Create a new object to hold updated arrow states
            const newArrows: ArrowState = {
                arrow1: false,
                arrow2: false,
                arrow3: false,
                arrow4: false,
                arrow5: false,
            };
            // Set the clicked arrow to true
            newArrows[arrow] = true;

            return newArrows;
        });
    };

    const handleVideoPlayer = (url: string | string[]) => {
        router.navigate({
            pathname: "/VideoPlayer",
            params: { videoUrl: url },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainScreenContainer}>
                <View style={styles.mainScreenImageContainer}>
                    <Image
                        source={require("@assets/images/hat-images/MainScreenImage.jpg")}
                        resizeMode="contain"
                        style={styles.mainScreenImage}
                    />
                    <Pressable
                        style={styles.arrowImageContainer1}
                        onPress={() => {
                            handleVideoPlayer(WHOMy5MomentsForHandHygieneVideos[0].videoUrl);
                            handlePress("arrow1")();
                        }}
                    >
                        <Image
                            source={
                                arrows.arrow1
                                    ? require("@assets/images/hat-images/1_violet.png")
                                    : require("@assets/images/hat-images/1_green.png")
                            }
                            resizeMode="contain"
                            style={styles.arrowImage1}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.arrowImageContainer2}
                        onPress={() => {
                            handleVideoPlayer(WHOMy5MomentsForHandHygieneVideos[1].videoUrl);
                            handlePress("arrow2")();
                        }}
                    >
                        <Image
                            source={
                                arrows.arrow2
                                    ? require("@assets/images/hat-images/2_violet.png")
                                    : require("@assets/images/hat-images/2_green.png")
                            }
                            resizeMode="contain"
                            style={styles.arrowImage2}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.arrowImageContainer3}
                        onPress={() => {
                            handleVideoPlayer(WHOMy5MomentsForHandHygieneVideos[2].videoUrl);
                            handlePress("arrow3")();
                        }}
                    >
                        <Image
                            source={
                                arrows.arrow3
                                    ? require("@assets/images/hat-images/3_violet.png")
                                    : require("@assets/images/hat-images/3_green.png")
                            }
                            resizeMode="contain"
                            style={styles.arrowImage3}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.arrowImageContainer4}
                        onPress={() => {
                            handleVideoPlayer(WHOMy5MomentsForHandHygieneVideos[3].videoUrl);
                            handlePress("arrow4")();
                        }}
                    >
                        <Image
                            source={
                                arrows.arrow4
                                    ? require("@assets/images/hat-images/4_violet.png")
                                    : require("@assets/images/hat-images/4_green.png")
                            }
                            resizeMode="contain"
                            style={styles.arrowImage4}
                        />
                    </Pressable>
                    <Pressable
                        style={styles.arrowImageContainer5}
                        onPress={() => {
                            handleVideoPlayer(WHOMy5MomentsForHandHygieneVideos[4].videoUrl);
                            handlePress("arrow5")();
                        }}
                    >
                        <Image
                            source={
                                arrows.arrow5
                                    ? require("@assets/images/hat-images/5_violet.png")
                                    : require("@assets/images/hat-images/5_green.png")
                            }
                            resizeMode="contain"
                            style={styles.arrowImage5}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = createStyleSheet({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        backgroundColor: 'white'
    },
    mainScreenContainer: {
        marginTop: 70,
        backgroundColor: "colors.textColor",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5,
        height: 300,
        maxHeight: 400,
    },
    mainScreenImage: {
        width: "100%",
        maxWidth: 400,
        height: 300,
        maxHeight: 400,
    },
    mainScreenImageContainer: {
        position: "relative",
        width: 400,
        height: "100%",
        maxHeight: 400,
    },
    arrowImageContainer1: {
        position: "absolute",
        top: 100,
        left: 36,
    },
    arrowImageContainer2: {
        position: "absolute",
        right: 125,
        top: 55,
    },
    arrowImageContainer3: {
        position: "absolute",
        bottom: 52,
        left: 95,
    },
    arrowImageContainer4: {
        position: "absolute",
        right: 50,
        top: 86,
    },
    arrowImageContainer5: {
        position: "absolute",
        right: 32,
        bottom: 35,
    },
    arrowImage1: {
        width: 80,
        height: 60,
    },
    arrowImage2: {
        width: 100,
        height: 60,
    },
    arrowImage3: {
        width: 100,
        height: 70,
    },
    arrowImage4: {
        width: 80,
        height: 70,
    },
    arrowImage5: {
        width: 80,
        height: 70,
    },
});

export default WHOMy5MomentsForHandHygiene;
