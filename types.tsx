/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Welcome: undefined;
  ScanList: DrawerNavigationProp<DrawerParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = DrawerScreenProps<NativeStackScreenProps<
  RootStackParamList,
  Screen
>>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};
export type DrawerParamList = {
  Scans: undefined;
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
