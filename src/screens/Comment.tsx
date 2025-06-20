import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const Comment = () => {

    const [comments, setComments] = React.useState<any>([]);
    // const [error, setError] = React.useState<string | null>(null);
    // const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fetchComments = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
            // console.log(response.data);
        } catch (error: any) {
            // console.log('Axios error:', error.message);
        }
    };
    const fetchCommentsFetch = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
                //   console.log(data);
            }
        } catch (error: any) {
            console.log('Axios error:', error.message);
        }
    };


    React.useEffect(() => {
        fetchComments();
        fetchCommentsFetch()
    }, []);

    const renderComments = ({ item }: any) => {
        console.log(item)
        return(
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.body}</Text>
          </View>
        )
     }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comment Screen</Text>
      <FlatList 
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderComments}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Comment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  }
});