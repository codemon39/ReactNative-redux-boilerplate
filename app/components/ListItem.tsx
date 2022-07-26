import * as React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../theme/useTheme';
import Card from './Card';
import {ThemeContextInterface} from '../theme/useTheme';

interface TaskItemType {
  id: string;
  title: string;
  done: boolean;
}

interface ListItemType {
  item: TaskItemType;
  index?: number;
  onPress: () => void;
}

const ListItem = ({item, onPress}: ListItemType): JSX.Element => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();
  return (
    <Card style={styles.card}>
      <Pressable
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.row, {opacity: item.done ? 0.8 : 1}]}
        onPress={onPress}>
        <Text
          style={[
            styles.title,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              color: theme?.color,
              textDecorationLine: item.done ? 'line-through' : 'none',
            },
          ]}>
          {item.title}
        </Text>
        <Icon
          name="checkbox-outline"
          size={20}
          color={item.done ? '#00d258' : 'gray'}
        />
      </Pressable>
    </Card>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4d505b',
  },
});
