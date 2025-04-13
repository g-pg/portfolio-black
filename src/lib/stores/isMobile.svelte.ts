import { browser } from '$app/environment';
export class Viewport {
  private _isMobile = $state(browser && window.innerWidth < 780);
  private _isListening = false;

  private handleResize() {
    this._isMobile = window.innerWidth < 780;
  }

  init() {
    if (browser) {
      this.handleResize.bind(this);
      window.addEventListener('resize', this.handleResize.bind(this));
      this._isListening = true;
    }
  }

  get isMobile() {
    if (!this._isListening) {
      this.init();
    }
    return this._isMobile;
  }
}

const vp = new Viewport();
export const viewport = vp;
