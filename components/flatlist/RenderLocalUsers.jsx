import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from "react-native";
import {
  appFonts,
  borderRadius,
  colors,
  fontSize,
  getAvatarUri,
} from "../../styles/styles";

export const RenderLocalUsers = ({
  item,
  onPress,
  selectedId,
  userId,
  RightComponent,
  refetch,
}) => {
  const animated = new Animated.Value(1);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const width = useRef(null);

  const avatarUri = getAvatarUri(item._id);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  if (selectedId === item._id) {
    Animated.timing(slideAnim, {
      toValue: -width.current,
      duration: 200,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  const connected =
    item.pendingConnection?.creator.hasAccepted &&
    item.pendingConnection?.recipient.hasAccepted;

  const isCreator = item.pendingConnection?.creator.user === userId;

  return (
    <Pressable
      key={item._id}
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
    >
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor: connected
              ? colors.primaryAccent
              : colors.primaryBackground,
          },
          { overflow: "hidden", opacity: animated },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 35,
              height: 35,
              marginRight: 15,
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={{
                uri: avatarUri,
              }}
            />
          </View>

          <View>
            <Text
              style={[styles.topLeftText, { fontFamily: appFonts.signika }]}
            >
              User
            </Text>
            <Text
              style={[
                styles.bottomLeftText,
                { fontFamily: appFonts.signika_bold },
              ]}
            >
              {item.alias}
            </Text>
          </View>
        </View>

        <View>
          {/* <Text style={{ textAlign: "right", color: colors.secondaryText }}>
            Active
          </Text>
          <Text style={{ color: colors.primaryText }}>Recently</Text> */}
          {/* <BodyText>
            One: {item.pendingConnection?.creator.hasAccepted ? "yes" : "no"}
          </BodyText>
          <BodyText>
            Two:{item.pendingConnection?.recipient.hasAccepted ? "yes" : "no"}
          </BodyText> */}
        </View>

        <View
          style={{
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <Animated.View
            onLayout={(e) => (width.current = e.nativeEvent.layout.width)}
            style={[
              { transform: [{ translateX: slideAnim }] },
              {
                height: "100%",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              {RightComponent && (
                <RightComponent
                  item={item}
                  selectedId={selectedId}
                  userId={userId}
                  refetch={refetch}
                />
              )}
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.primaryBackground,
    marginBottom: 20,
    // padding: 15,
    borderRadius: borderRadius.xlarge,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topLeftText: {
    color: colors.secondaryText,
  },
  bottomLeftText: {
    color: colors.primaryText,

    fontSize: fontSize.large,
  },
});
