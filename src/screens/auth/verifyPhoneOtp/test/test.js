import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const HEADER_MAX_HEIGHT = 380;
const HEADER_MIN_HEIGHT = 65;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const {width, height} = Dimensions.get('window');

export const AnimatedHeader = ({
  component,
  isDrawer,
  headerTag,
  navigation,
  newsImage,
  header,
  secTag,
  isTabScreen,
  scrollEnabled,
  isPagingScreen,
  showActivityIndicator,
  refreshControl,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const scrollDistance = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT - 12, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 1],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.saveArea}>
      <Animated.View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          transform: [
            {
              translateY: scrollDistance,
            },
          ],
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 1,
          //   marginTop: HEADER_MAX_HEIGHT,
        }}
      />

      <Animated.View
        style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslateY}],
              zIndex: -1,
            },
          ]}
          source={require('../../../../assets/images/homeBg.png')}
        />
        <View
          style={{
            width: width,
            height: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            position: 'absolute',
            bottom: -1,
            borderBottomWidth: 0,
          }}>
          {/* {newsImage && newsImage()} */}
        </View>
        {/* {header && header()} */}
      </Animated.View>

      <View
        style={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          overflow: 'hidden',
          padding: 0,
          zIndex: 2,
        }}>
        <Animated.ScrollView
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT - 12,
            paddingBottom: HEADER_MAX_HEIGHT,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}></Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#AD0504',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#AD0504',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingRight: 15,
    paddingTop: 50,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    // marginTop: 40,
    height: HEADER_MIN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 20,
    // backgroundColor: 'red',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
    color: 'black',
  },
});
