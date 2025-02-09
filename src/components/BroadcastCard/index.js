import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ContactAvatar from '../ContactAvatar';
import {Colors, Fonts} from '../../config';
import Images from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { useSelector } from 'react-redux';

const BroadcastCard = ({chat, onPress}) => {
  const userId = useSelector(state => state.user?.user?.userId);
  const sentByMe = userId === chat?.senderId
  console.log("🚀 ~ BroadcastCard ~ sentByMe:", sentByMe)

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          color: Colors.black,
          fontFamily: Fonts.RobotoRegular,
          marginBottom: 5,
        }}>
        {chat?.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
            paddingRight: 30,
            fontSize: 14,
            color: Colors.lightGrey,
            fontFamily: Fonts.RobotoRegular,
          }}>
          {chat?.content}
        </Text>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: Colors.lightGrey,
              fontFamily: Fonts.RobotoRegular,
              textAlign: 'right',
            }}>
            {moment(chat?.createdAt).format('DD/MM/YYYY')}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.lightGrey,
              fontFamily: Fonts.RobotoRegular,
              textAlign: 'right',
            }}>
            {moment(chat?.createdAt).format('hh:mm a')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {chat?.receiverIds?.slice(0, 3)?.map((user, index) => {
          const userTemp = {userId: user};
          return (
            <ContactAvatar
              key={index}
              contact={userTemp}
              size={30}
              displayName={false}
              containerStyle={{marginRight: -7, zIndex: 99 - index}}
            />
          );
        })}
        {chat?.receiverIds?.length > 3 && (
          <View
            style={{
              borderRadius: 34 / 2,
              backgroundColor: Colors.white,
              height: 34,
              width: 34,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: -7,
              borderWidth: 2,
              borderColor: Colors.darkGrey,
            }}>
            <Text
              style={{
                color: Colors.darkerGrey,
                fontFamily: Fonts.RobotoRegular,
              }}>
              {chat?.receiverIds?.length - 3}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BroadcastCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tick: {
    width: 15,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
});
