// import components goes here
import { SafeAreaView, ViewStyle } from "react-native";
import React, { FC } from "react";
import styles from "./styles";

// props interface to handle params
interface GTSafeAreaViewProps {
  children: any;
  mainContainer?: ViewStyle;
}
/**
 * GTSafeAreaView renders nested content and automatically applies padding to reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views
 * @param {any} children take any child compnent to render
 */
const GTSafeAreaView: FC<GTSafeAreaViewProps> = ({
  children,
  mainContainer,
}: any) => {
  // Main Container with SafeAreaView
  return (
    <SafeAreaView style={{ ...styles.mainContainer, ...mainContainer }}>
      {children}
    </SafeAreaView>
  );
};
// exporting component
export default GTSafeAreaView;
