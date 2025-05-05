import { action, makeAutoObservable } from 'mobx';

const THEME_KEY = 'theme';

export class AppStore {
  theme: 'light' | 'dark' = 'light';
  isPhone: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  deviceWidth: number = 0;
  isLoggedIn: boolean = false;
  isModalOpened: boolean = false;
  isNavBarOpened: boolean = false;

  constructor() {
    makeAutoObservable(this);
    const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark';
    if (savedTheme) {
      this.theme = savedTheme;
    }
  }

  Me(){
    //TODO: this is to be updated with the backend check.
    if(window.localStorage.getItem("token") === null){
     this.setIsLoggedIn(false)
    }
    else {
      this.setIsLoggedIn(true)
    }    
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }

  setIsPhone(isPhone: boolean) {
    this.isPhone = isPhone;
    this.isTablet = false;
    this.isDesktop = false;
  }

  setIsTablet(isTablet: boolean) {
    this.isTablet = isTablet;
    this.isPhone = false;
    this.isDesktop = false;
  }

  setIsDesktop(isDesktop: boolean) {
    this.isDesktop = isDesktop;
    this.isPhone = false;
    this.isTablet = false;
  }

  setDeviceWidth(state: number) {
    this.deviceWidth = state;
  }

  @action
  setIsLoggedIn(state: boolean){
    this.isLoggedIn = state
  }

  @action
  setIsNavBarOpened(state: boolean) {
    this.isNavBarOpened = state;
  }
}

export const appStore = new AppStore();