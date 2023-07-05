import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';
import NetwokExampleCard from '../components/NetwokExampleCard';

import {RootState, AppDispatch} from '../store/store';
import {fetchUser, createUser} from '../store/dummyNetwork';

const dummyData = {
  name: 'Harry',
  email: 'harry@hogwarts.com',
};

export default function NetworkExample() {
  const {theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const userStatus = useSelector(
    (state: RootState) => state.dummyNetwork.status,
  );

  const user = useSelector((state: RootState) => state.dummyNetwork.data);
  const newUser = useSelector((state: RootState) => state.dummyNetwork.newUser);

  const fetchData = () => {
    dispatch(fetchUser());
  };

  const postData = () => {
    dispatch(createUser(dummyData));
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {/* Get Card */}
        <NetwokExampleCard
          title="GET"
          loading={userStatus === 'loading'}
          onPress={fetchData}>
          <Text style={[styles.url, {color: theme.color}]}>
            URL: https://jsonplaceholder.typicode.com/users/1
          </Text>
          <Text style={[styles.url, {color: theme.color}]}>{userStatus}</Text>

          {userStatus === 'succeeded' ? (
            <>
              <Text style={{color: theme.color}}>{user.name}</Text>
              <Text style={{color: theme.color}}>{user.email}</Text>
            </>
          ) : (
            <>
              <Text style={[styles.url, {color: theme.color}]}>
                Press fire to fetch the data
              </Text>
            </>
          )}
        </NetwokExampleCard>

        {/* Post Card */}
        <NetwokExampleCard title="POST" onPress={postData}>
          <Text style={[styles.url, {color: theme.color}]}>
            URL: https://jsonplaceholder.typicode.com/users
          </Text>

          <View style={styles.row}>
            <View style={styles.grid}>
              <Text style={[styles.code, {color: theme.color}]}>Payload:</Text>
              <Text style={[styles.code, {color: theme.color}]}>
                {JSON.stringify(dummyData, null, 2)}
              </Text>
            </View>
            <View style={styles.grid}>
              <Text style={[styles.code, {color: theme.color}]}>
                From network:
              </Text>
              <Text style={[styles.code, {color: theme.color}]}>
                {JSON.stringify(newUser, null, 2)}
              </Text>
            </View>
          </View>
        </NetwokExampleCard>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  url: {
    fontSize: 12,
    marginBottom: 10,
  },
  code: {
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  grid: {
    flex: 0.5,
  },
});
