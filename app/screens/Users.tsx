import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet,TouchableOpacity } from "react-native";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as vw,heightPercentageToDP as vh } from "react-native-responsive-screen";

const Users = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const usersPerPage = 10; // Adjust this to control how many users to load at once
    const navigation = useNavigation();

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dummyjson.com/users?limit=${usersPerPage}&skip=${(pageNumber - 1) * usersPerPage}`);
            setData(prevData => [...prevData, ...response.data.users]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const loadMoreUsers = () => {
        if (!isLoadingMore && !loading) {
            setIsLoadingMore(true);
            setPage(prevPage => prevPage + 1);
            setIsLoadingMore(false);
        }
    };

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity
          onPress={() =>
            navigation.navigate("Posts", {
              userId: item.id,
              userName: `${item.firstName} ${item.lastName}`,
              userEmail: item.email, 
              userCompany: item.company?.name || "No Company",
            })
          } // Navigate to Posts screen with userId
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.company}>{item.company?.name}</Text>
            </View>
          </TouchableOpacity>
        );
      };

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
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={loadMoreUsers}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        padding: 16,
        marginVertical: vh(1),
        marginHorizontal: vw(6),
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: vw(20),
        height: vw(20),
        borderRadius: 10,
        borderWidth:2,
        marginBottom: 10,
        borderColor:'black'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: 'gray',
    },
    company: {
        fontSize: 14,
        color: 'darkgray',
    },
});

export default Users;
