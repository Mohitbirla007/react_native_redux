import React from 'react'
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { mediaPlayerData, MediaPlayerDataTypes } from '../constants'
import Sound from 'react-native-sound'

export const MediaPlayer = () => {
    const [isPlaying, setIsPlaying] = React.useState<any>();
    const [sound, setSound] = React.useState<Sound>()

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

    const renderPlayerItem = (item: MediaPlayerDataTypes) => {
      const playButtonImg = require('./../assets/play_button.png');
      const pauseButtonImg = require('./../assets/pause.png');
        return(
            <View style={styles.flatlistItmeStyle}>
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
        )
    }
    return(
        <View style={styles.mainContainerStyle}>
            <FlatList
                data={mediaPlayerData}
                renderItem={(item) => renderPlayerItem(item.item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainerStyle: {flex: 1, alignItems: 'center'},
    flatlistItmeStyle: {margin: 10, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 20},
    titleContainer: {flexDirection: 'row', justifyContent: 'space-between', width: '90%'},
    styledText: {marginVertical: 3, fontWeight: '600', color: 'white'}
})