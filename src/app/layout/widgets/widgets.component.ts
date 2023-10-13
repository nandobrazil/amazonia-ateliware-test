import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StorageKeys} from "../../shared/constants/storage-key";

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {

  @Output() toggleSidenav = new EventEmitter<boolean>();
  hideSidenav = false;
  fullscreen = false;
  showFilter = false;
  showWidget = false;
  themes: any;

  constructor(
  ) {
    // if (this.darkTheme) {
    //   document.body.classList.add('dark-theme');
    // }
    this.themes = [
      { code: 18, active: false },
      { code: 210, active: true },
      { code: 269, active: false },
    ];
    // const theme = localStorage.getItem(StorageKeys.HSL);
    // if (theme && parseInt(theme) !== 210) {
    //   this.themes[6].active = false;
    //   this.changeTheme(this.themes.find((t: any) => t.code === parseInt(theme)));
    // }
  }

  toggleTheme() {
    // this.darkTheme = !this.darkTheme;
    //
    // if (this.darkTheme) {
    //   document.body.classList.add('dark-theme');
    // } else {
    //   document.body.classList.remove('dark-theme');
    // }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleFullscreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const requestFullScreen = docEl.requestFullscreen;
    const exitFullScreen = doc.exitFullscreen;

    if (!this.fullscreen) {
      if (requestFullScreen) {
        requestFullScreen.call(docEl);
      }
      this.fullscreen = true;
    } else {
      if (exitFullScreen) {
        exitFullScreen.call(doc);
      }
      this.fullscreen = false;
    }
  }

  toggleSidenavEmit() {
    this.hideSidenav = !this.hideSidenav;
    this.toggleSidenav.emit(this.hideSidenav);
  }

  changeTheme(theme: string) {
    // this.themes.forEach((t: any) => t.active = false);
    // theme.active = true;
    // document.documentElement.style.setProperty('--hsl-color', `${theme.code}`);
    const oldTheme = '';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    const newHref = themeLink.getAttribute('href')!.replace(oldTheme, theme);
    this.replaceThemeLink(newHref);
  }

  replaceThemeLink(href: string) {
    const id = 'theme-link';
    const themeLink = <HTMLLinkElement>document.getElementById(id);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
    });
  }
}
