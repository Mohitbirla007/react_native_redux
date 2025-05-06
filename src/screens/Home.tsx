import React, { SetStateAction, useEffect } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { increaseCounter, decreseCounter, clearUserList, fetchUser } from '../redux/ReduxToolkit/store/slices/userSlice';
import { requestMultiple, PERMISSIONS, PermissionStatus, check, RESULTS, request } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';
import { createThumbnail } from "react-native-create-thumbnail";
import ImagePicker, { Video } from "react-native-image-crop-picker";
import { generateThumbnail } from '../utils';
import DocumentPicker,{ DocumentPickerOptions } from 'react-native-document-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

interface UserDetails {
  address: {
    city: string, 
    geo: {lat: number, lng: number}, 
    street: string, suite: string, zipcode: string}, 
    company: {bs: string, catchPhrase: string, name: string}, 
    email: string,
    id: number,
    name: string,
    phone: number,
    username: string,
    website: string
  }

export const Home = () => {
    const [userList, setUserList] = React.useState<UserDetails[]>([]);
    // const [copy, userDetails]
    const [imagePath, setImagePath] = React.useState<SetStateAction<string>>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [verticalScrollOffset, setVerticalScrollOffset] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.users)
    const counterSelector = useSelector((state: any) => state.counter);
    const emailRegex = /^(|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const flatlistRef = React.createRef<FlatList>()


    useEffect(() => {
        console.log('0000000000 set user lsit', selector.userList);
        setUserList(selector.userList)
    }, [])

    const handleOnpress = () => {
        dispatch(decreseCounter())
    }
    const clearUser = () => {
        setImagePath('');
        setUserList([]);
        dispatch(clearUserList())
    }

    const selectFile = async () => {
        // requestPermission()
        flatlistRef && flatlistRef.current && flatlistRef.current?.scrollToIndex({
          animated: true,
          index: 10,
        })
        // const permission = await requestPermission()
        // if (permission) {
        //     // imagePicker();
        //     documentPicker();
        // }
    }

    const AnimatedImage = ({ source, style }: any) => {
        const imageSource = typeof source === 'string' 
          ? { 
              uri: source,
              cache: 'reload',
              headers: { Pragma: 'no-cache' }
            }
          : source;
      
        return (
          <Image
            source={imageSource}
            style={style}
            resizeMode="contain"
            // renderToHardwareTextureAndroid={true}
            loadingIndicatorSource={imageSource}
            progressiveRenderingEnabled={true}
          />
        );
      };

    const imageCropPicker = async () => {
        const fetchVideo = await ImagePicker.openPicker({
            mediaType: "any",
            // multiple: true,
            // compressVideoPreset: '640x480'
        })
        // const videos = await Promise.all(fetchVideo.map(async (video) => {
        //     return {
        //         ...video,
        //         thumbnail: await generateThumbnail(video.sourceURL ?? "")
        //     }
        // }))
        // console.log("44444444444444", fetchVideo);
        setImagePath(fetchVideo.sourceURL as any);
    }

    const documentPicker = async () => {
        try {
            const result = await DocumentPicker.pick({
              type: [DocumentPicker.types?.images],
            //   allowMultiSelection:true
            });
            // console.log("111111111111", result)
            result.forEach((item) => {
                setImagePath(item.uri)
            })
          } catch (error) {
             Alert.alert('User canceled document picker');
          }
    }

    const imagePicker = () => {
        launchImageLibrary({
            mediaType: 'mixed',
            includeBase64: true,
        }).then((imageLibraryResponse) => {
            if (imageLibraryResponse.assets)
                imageLibraryResponse.assets.forEach(async (item) => {
                    if (item.uri) {
                      // console.log("11111111", item);
                      
                        setImagePath(item.uri)
                        // const thumbnail = await generateThumbnail(item.uri ?? "");
                        // Alert.alert("showAlert", JSON.stringify(thumbnail))
                    }
                })
        }).catch(err => console.log("22222222222", err))
    }

    const requestPermission = async () => {
        try {
            // Check both permissions
            const permissionResult = await requestMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]);
            const result = permissionResult["ios.permission.PHOTO_LIBRARY"] === permissionResult["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] ? permissionResult["ios.permission.PHOTO_LIBRARY"] : RESULTS.DENIED;
        
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log('Feature is not available');
                return false;
              
              case RESULTS.DENIED:
                // Request both permissions if either is denied
                const readResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                const writeResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
                return readResult === RESULTS.GRANTED && writeResult === RESULTS.GRANTED;
              
              case RESULTS.LIMITED:
                console.log('Limited access granted');
                return true;
              
              case RESULTS.GRANTED:
                console.log('All permissions granted');
                imageCropPicker();
                // documentPicker();
                // imagePicker()
                return true;
              
              case RESULTS.BLOCKED:
                console.log('Permissions denied and not requestable anymore');
                return false;
                
              default:
                return false;
            }
          } catch (error) {
            console.error('Permission error:', error);
            return false;
          }
    }

    const renderItem = (item: UserDetails, index: number) => {
      return(
        <View style={{ padding: 5, marginVertical: 5 , flexDirection: 'row', justifyContent: 'space-around'}}>
          <View>
            <Text>Name :     {item.name} {index}</Text>
            <Text>Email :      {item.email}</Text>
            <Text>Phone :    {item.phone}</Text>
            <View style={styles.flexRow}>
              <Text>Address : </Text>
              <View>
                <Text>{item.address.street}</Text>
                <Text>{item.address.suite}</Text>
                <Text>{item.address.city}</Text>
                <Text>{item.address.zipcode}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() =>onEdit(item, index)} style={{borderWidth: 1, borderColor: 'black', height: 30, borderRadius: 15, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}><Text>Edit : </Text></TouchableOpacity>
        </View>
      )
    }

    const onEdit = (userDetails : UserDetails, index1: number) => {
        setIsLoading(true);
        setTimeout(() => {
          let userListCopy
          let copyItem = {
            address: {
            city: 'indore', 
            geo: {lat: 1234, lng: 1234}, 
            street: 'string', suite: 'string', zipcode: 'string'}, 
            company: {bs: 'string', catchPhrase: 'string', name: 'string'}, 
            email: 'string',
            id: 1984,
            name: 'string',
            phone: 1984,
            username: 'string',
            website: 'string'
          }
          userListCopy = userList.map((item, index) => {
            if (index === index1) {
              return copyItem;  // New value
            }
            return item;
          });
          console.log("33333333", userListCopy[index1])
          setUserList(userListCopy);
          setIsLoading(false);
        }, 4000);
        // dispatch(fetchUser(selector.userName));
    }

    const onReachEnd = () => {
      let userData = [...userList, ...selector.userList];
      setUserList(userData as any)
    }
    const onMomentScrollEnd = (event : NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log("111111", event.nativeEvent.contentOffset)
      setVerticalScrollOffset(event.nativeEvent.contentOffset.y)
    }

    const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log("2222222", event.nativeEvent.contentOffset)
      setVerticalScrollOffset(event.nativeEvent.contentOffset.y)
    }

    const handleInput = (text: string) => {
      let test = text.match(emailRegex);
      console.log("tewewe1111111111", test)
      if(test){
        setEmail(text);
        setEmailError(null)
      } else {
        setEmailError("enter valie email")
      }
    }

    return (
      <SafeAreaView style={{ paddingHorizontal: 10 }}>
        {/* <ScrollView> */}
        {isLoading ? < ActivityIndicator size={'large'}/> :
          <View>
            <FlatList
              ref={flatlistRef}
              data={userList}
              keyExtractor={(item) => `${item.id}${Math.random().toFixed(3)}` as any}
              renderItem={(item) => renderItem(item.item, item.index)}
              // onEndReached={onReachEnd}
              onMomentumScrollEnd={onMomentScrollEnd}
              onScrollEndDrag={onScrollEndDrag}
              ListHeaderComponent={() => <>
                <CustomButton text={`Decrese ${counterSelector.counter}`} handlePress={handleOnpress} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} />
                <CustomButton text={`Clear User`} handlePress={clearUser} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} />
                <CustomButton text={"select file"} buttonStyle={styles.buttonWidth40} textStyle={styles.whiteText} handlePress={selectFile} />
              </>}
              scrollEnabled
              initialNumToRender={10} // Initially render 20 items
              maxToRenderPerBatch={10} // Render 50 items at a time during scrolling
              windowSize={5} // Optimize memory usage by rendering 5 times the visible area
              // getItemLayout={getItemLayout} // Optimize layout calculations
              removeClippedSubviews={true} // Remove off-screen items
              ListFooterComponent={() => <>
                {imagePath && <AnimatedImage
                  source={{ uri: imagePath }}
                  style={{ height: 200, width: 200 }}
                />
                }</>}
            />
            <TextInput keyboardType='email-address' style={{borderWidth: 1, borderColor: 'black'}} onChangeText={handleInput}/>
            {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}
          </View>
        }
        {/* </ScrollView> */}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    blackText: { color: 'black' },
    whiteText: { color: 'white' },
    buttonWidth40: { width: '40%' },
    marginVirticle: { marginVertical: 20, },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContainer: {
      padding: 10,
    },
    flexRow: {flexDirection: 'row'},
    flex: {flex: 1},
    alignContentCenter: {justifyContent: 'center', alignItems: 'center'},
})