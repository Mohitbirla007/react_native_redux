import React from 'react'
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { mediaPlayerData, MediaPlayerDataTypes } from '../constants'
import Sound from 'react-native-sound'
import {
  TapGestureHandler,
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


export const MediaPlayer = () => {
    const [isPlaying, setIsPlaying] = React.useState<any>();
    const [sound, setSound] = React.useState<Sound>();
    const [heartIndex, setHeartIndex] = React.useState<{X: number, Y: number}>();
    const [heartIconSize, setHeartIconSize] = React.useState<number>(60);
    const timeoutRef = React.useRef<any>();
    const flatlistRef = React.createRef<FlatList>();
    const tapRef = React.createRef<TapGestureHandler>();
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const translateYAnim = React.useRef(new Animated.Value(0)).current;
    const rotateAnim = React.useRef(new Animated.Value(0)).current;
    const rotate = rotateAnim.interpolate({
      inputRange: [-40, 40],
      outputRange: ['-40deg', '40deg'],
    });

    const heartColor = ['red', 'pink', 'orage', 'blue', 'green']

    const rendomIndex = React.useCallback(() => {
      return Math.floor(Math.random() * 5)
    }, []);

    const debounceHeartSize = () => {
      if (timeoutRef.current) {
        setHeartIconSize(heartIconSize + 10)
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setHeartIconSize(60);
      }, 1000);
    };


    const playAudio = (media: MediaPlayerDataTypes) => {
        // Create a new sound object
        const sound = new Sound(media.videoUrl,'', (error) => {
          if (error) {
            console.log('Error loading audio file:', error);
            return;
          }
          setSound(sound);
          // Play the sound
          console.log("play sound", sound.isPlaying())

          if(!sound.isPlaying()){
            console.log("play sound")
            sound.play((success) => {
              if (success) {
                console.log('Audio finished playing');
              } else {
                console.log('Playback failed due to audio decoding errors');
              }
              setIsPlaying(false);
              console.log('current time', sound.getCurrentTime())
            });
          } else {
            console.log("pause song");
            sound.pause();
          }

          setIsPlaying(true);
        });
      };

      const handleDoubleTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.ACTIVE) {
          const { absoluteX, absoluteY } = event.nativeEvent;
          setHeartIndex({X: absoluteX, Y : absoluteY});
          debounceHeartSize()
          animateHeart();
        }
      };

      const animateHeart = () => {
        scaleAnim.setValue(0);
        opacityAnim.setValue(1);
        translateYAnim.setValue(0)
        rotateAnim.setValue(0);

        const angle = Math.random() < 0.5 ? -40 : 40;
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 4,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 2000,
            delay: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -500, // move upward (negative Y)
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: angle,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
      
        ]).start();
      };

    const renderPlayerItem = (item: MediaPlayerDataTypes) => {
      const playButtonImg = require('./../assets/play_button.png');
      const pauseButtonImg = require('./../assets/pause.png');
        return(
            <GestureHandlerRootView style={styles.flatlistItmeStyle}>
              <TapGestureHandler
                ref={tapRef}
                numberOfTaps={2}
                // onActivated={() => console.log('double tap', tapRef.current)}
                onHandlerStateChange={handleDoubleTap}
              >
                <View>
                <Image source={{uri: item.thumbnailUrl}} style={{height: 300, width: '90%', borderRadius: 20}}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.styledText}>{item.title}</Text>
                    <Text style={styles.styledText}>{item.duration}</Text>
                </View>
                <Text style={[styles.styledText]}>{item.subscriber}</Text>
                <TouchableOpacity style={{ position: 'absolute', zIndex: 9}} onPress={() => playAudio(item)}>
                    <Image source={sound && sound.isPlaying() ? pauseButtonImg : playButtonImg} style={{height: 50, width: 50}}/>
                </TouchableOpacity>
                </View>
              </TapGestureHandler>
            </GestureHandlerRootView>
        )
    }
    return(
        <View style={styles.mainContainerStyle}>
            <FlatList
              ref={flatlistRef}
                data={mediaPlayerData}
                keyExtractor={(item) => item.id}
                renderItem={(item) => renderPlayerItem(item.item)}
            />
            {heartIndex?.X && 
              <Animated.View
                  style={[
                    styles.heartContainer,
                    {
                      transform: [{ scale: scaleAnim }, { translateY: translateYAnim }, { rotate: rotate }],
                      opacity: opacityAnim,
                      top: heartIndex.Y - 200 ,
                      left: heartIndex.X - 30,
                    },
                  ]}
                >
                  <Icon name="heart" size={heartIconSize} color={heartColor[rendomIndex()]} />
              </Animated.View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainerStyle: {flex: 1, alignItems: 'center'},
    flatlistItmeStyle: {margin: 10, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 20},
    titleContainer: {flexDirection: 'row', justifyContent: 'space-between', width: '90%'},
    styledText: {marginVertical: 3, fontWeight: '600', color: 'white'},
    heartContainer: {
      position: 'absolute',
    },
})