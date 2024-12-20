import { createThumbnail } from "react-native-create-thumbnail";

export const generateThumbnail = async (videoUrl: string) => {
    try {
      const thumbnail = await createThumbnail({
        url: videoUrl,
        timeStamp: 1000,
        format: 'png',
      })
      return thumbnail.path
    } catch (error) {
      console.log("Thumbnail Error : ",error)
    }
  };
  