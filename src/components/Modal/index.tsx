import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { colors } from '@theme/index';

interface SwipeableModalProps {
    visible: boolean;
    onDismiss: () => void;
    style?: StyleProp<ViewStyle>;
    backgroundColor?: string;
    children?: React.ReactNode;
}

function SwipeableModal({ visible, onDismiss, style, backgroundColor, children }: SwipeableModalProps) {

    const screenHeight = Dimensions.get('screen').height;

    const panY = useRef(new Animated.Value(screenHeight)).current;

    const resetPositionAnim = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeAnim = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    useEffect(() => {
        resetPositionAnim.start();
    }, [resetPositionAnim]);

    const panResponders = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: Animated.event([null, { dy: panY }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gs) => {
                if (gs.dy > 0 && gs.vy > 2) {
                    return handleDismiss();
                }
                return resetPositionAnim.start();
            },
        }),
    ).current;

    const handleDismiss = () => closeAnim.start(() => onDismiss());
    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={handleDismiss}
            transparent>
            <View style={[styles.overlay, style]}>
                <Animated.View
                    style={[{
                        ...styles.container,
                        backgroundColor: backgroundColor,
                        transform: [{ translateY: translateY }]
                    }]}
                    {...panResponders.panHandlers}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    container: {
        height: '100%',
    },
});

export default SwipeableModal;
