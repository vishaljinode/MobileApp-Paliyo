import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Share } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const posts = [
  {
    id: '1',
    text: 'A beautiful scene!',
    image: 'https://via.placeholder.com/400x300.png?text=Post+1',
    username: 'NatureLover',
    userIconUrl: 'https://via.placeholder.com/50x50.png?text=User+1'
  },
  {
    id: '2',
    text: 'Lovely mountains',
    image: 'https://via.placeholder.com/400x300.png?text=Post+2',
    username: 'MountainFan',
    userIconUrl: 'https://via.placeholder.com/50x50.png?text=User+2'
  },
  {
    id: '3',
    text: 'City lights',
    image: 'https://via.placeholder.com/400x300.png?text=Post+3',
    username: 'CityExplorer',
    userIconUrl: 'https://via.placeholder.com/50x50.png?text=User+3'
  },
];

export default function App() {
  const [likes, setLikes] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCommentIconClick = (postId) => {
    setShowCommentBox(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const handleShare = async (post) => {
    try {
      await Share.share({
        message: `${post.text}\nCheck out this post: ${post.image}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(prevState => !prevState);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.userHeader}>
        <Image source={{ uri: item.userIconUrl }} style={styles.userIcon} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.postText}>{item.text}</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconTouch} onPress={() => toggleLike(item.id)}>
          <FontAwesome name={likes[item.id] ? "heart" : "heart-o"} size={24} color={likes[item.id] ? "red" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouch} onPress={() => handleCommentIconClick(item.id)}>
          <FontAwesome name="comment-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTouch} onPress={() => handleShare(item)}>
          <FontAwesome name="send-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showCommentBox[item.id] && (
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          autoFocus={true}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
      {showSearchInput && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          autoFocus={true}
          onBlur={() => setShowSearchInput(false)}
        />
      )}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navIcon}>
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={toggleSearchInput}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <FontAwesome name="plus-square-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <FontAwesome name="user-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop : 60
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    padding: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postText: {
    padding: 10,
    fontSize: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconTouch: {
    padding: 10,
  },
  commentInput: {
    padding: 8,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#dedede',
    backgroundColor: '#f8f8f8'
  },
 navIcon: {
    padding: 10,
  },
  searchInput: {
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
