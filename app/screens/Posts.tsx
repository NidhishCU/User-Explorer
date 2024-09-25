import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from 'axios';
import { widthPercentageToDP as vw,heightPercentageToDP as vh } from "react-native-responsive-screen";

const Posts = ({ route }) => {
  const { userId, userName, userEmail, userCompany } = route.params; // Get user info passed from the User List screen
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const postsPerPage = 10; // Control how many posts to load at once

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}/posts?limit=${postsPerPage}&skip=${(pageNumber - 1) * postsPerPage}`);
      setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (!isLoadingMore && !loading && posts.length > 0) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      setIsLoadingMore(false);
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator size="small" color="#ffffff" style={{ marginVertical: 10 }} />;
    }
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
      ) : (
        <>
          {/* Display User Information */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
            <Text style={styles.userCompany}>{userCompany}</Text>
          </View>
          
          {/* Display "No Posts Found" if the user has no posts */}
          {posts.length === 0 && !loading ? (
            <Text style={styles.noPosts}>No posts found</Text>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={item => item.id.toString()}
              onEndReached={loadMorePosts}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    padding: 16,
    backgroundColor: '#333',
    marginBottom: vh(3),
    borderRadius: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 15,
    color: 'gray',
  },
  userCompany: {
    fontSize: 15,
    color: 'darkgray',
  },
  postCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: 'gray',
  },
  noPosts: {
    fontSize: 30,
    color: 'gray',
    textAlign: 'center',
    marginTop: vh(10),
  },
});

export default Posts;
