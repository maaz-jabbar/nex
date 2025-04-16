import {CommonActions, DrawerActions} from '@react-navigation/native';

let _navigator: any;

interface Route {
  name: string;
  params?: any;
}

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(name: any, params?: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

function resetStack(name: string) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name}],
    }),
  );
}

function resetToCustomStack(routes: Route[]) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: routes,
    }),
  );
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

export {
  navigate,
  resetStack,
  resetToCustomStack,
  setTopLevelNavigator,
  goBack,
  openDrawer,
  closeDrawer,
};
