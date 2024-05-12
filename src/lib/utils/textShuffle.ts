import { onDestroy } from 'svelte';

type ShuffleOptions = {
  playOn?: Array<'hover' | 'load'>;
  dictionary?: 'own' | 'alphabet' | 'all';
  speed?: number;
  duration?: number;
  delay?: number;
  finalText?: string;
  targetNode?: HTMLElement;
  reverseOnMouseLeave?: boolean;
};

function getRandomIndex(text: string | string[]) {
  return Math.floor(Math.random() * text.length);
}

let shuffles: Shuffle[] = [];
export function textShuffle(node: HTMLElement, options?: ShuffleOptions) {
  const shuffle = new Shuffle(node, options);
  shuffles.push(shuffle);
  const shuffleId = shuffle.id;

  return {
    destroy() {
      shuffles = shuffles.filter(s => {
        if (s.id !== shuffleId) {
          s.removeHoverListeners();
          return true;
        }
      });
    },
  };
}

class Shuffle {
  id;
  playOn = ['hover'];
  speed;
  duration;
  delay;
  startText;
  finalText;
  node;
  targetNode;

  shuffleInterval = 0;
  shuffleTimeout = 0;

  dictionary = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*();:<>,./?';

  isShuffling = false;
  reverseOnMouseLeave = true;

  differentNodes = false;
  constructor(node: HTMLElement, options?: ShuffleOptions) {
    this.id = String(shuffles.length + 1);
    this.node = node;

    this.playOn = options?.playOn || ['hover'];
    this.speed = options?.speed || 0.06;
    this.duration = options?.duration || 0.4;
    this.delay = options?.delay || 0;
    this.targetNode = options?.targetNode || this.node;
    this.finalText = options?.finalText || this.node.innerText;
    this.startText = this.targetNode.innerText || node?.innerText;
    this.reverseOnMouseLeave = options?.hasOwnProperty('reverseOnMouseLeave') ? options.reverseOnMouseLeave! : true;
    this.dictionary = this.chooseDictionary(options?.dictionary || 'all');

    if (options?.targetNode) {
      this.differentNodes = true;
    }

    if (this.playOn.includes('load')) {
      setTimeout(() => {
        this.shuffle();
      }, this.delay * 1000);
    }

    if (this.playOn.includes('hover')) {
      this.addHoverListeners();
    }
  }

  private _mouseEnterFunction() {
    this.clearShuffle();
    // clearInterval(this.shuffleInterval);
    // clearTimeout(this.shuffleTimeout);
    this.shuffle();
    this.targetNode.innerText = this.startText;
  }

  private _mouseLeaveFunction() {
    this.clearShuffle();
    // clearInterval(this.shuffleInterval);
    // clearTimeout(this.shuffleTimeout);
    this.targetNode.innerText = this.startText;

    if (this.reverseOnMouseLeave) {
      this.shuffle(this.startText);
    }
  }
  private addHoverListeners() {
    this.node.addEventListener('mouseenter', () => this._mouseEnterFunction());
    this.node.addEventListener('mouseleave', () => this._mouseLeaveFunction());
  }

  public removeHoverListeners() {
    this.node.removeEventListener('mouseenter', () => this._mouseEnterFunction());
    this.node.removeEventListener('mouseleave', () => this._mouseLeaveFunction());
  }

  private chooseDictionary(dictionary: ShuffleOptions['dictionary']): string {
    if (dictionary === 'own') {
      return this.finalText;
    }

    if (dictionary === 'all') {
      return 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*();:<>,./?';
    }

    if (typeof dictionary === 'string') {
      return dictionary;
    }

    return 'abcdefghijklmnopqrstuvwxyz';
  }

  shuffle(textTo?: string) {
    if (this.targetNode.hasAttribute(`data-shuffling`)) {
      shuffles.forEach(s => s.clearShuffle());
    }

    this.targetNode.setAttribute(`data-shuffling`, this.id);

    let finalText = textTo || this.finalText;

    let shuffledText = this.startText.split('');

    let iterations = 0;

    let startClearing = false;

    let countDown = 0;
    this.shuffleInterval = setInterval(() => {
      if (finalText.length > shuffledText.length) {
        shuffledText.push(this.dictionary[getRandomIndex(this.dictionary)]);
      } else if (finalText.length < shuffledText.length) {
        shuffledText.pop();
      }

      if (iterations === 0) {
        shuffledText[0] = this.dictionary[getRandomIndex(this.dictionary)];
      }

      for (let i = 0; i < finalText.length; i++) {
        if (startClearing && i < countDown) {
          shuffledText[i] = finalText[i];
          continue;
        }

        const selectedLetter = shuffledText[i];
        if (selectedLetter === ' ') continue;

        shuffledText[i] = this.dictionary[getRandomIndex(this.dictionary)];
      }

      const joinedShuffle = shuffledText.join('');

      this.targetNode.innerText = joinedShuffle;
      iterations++;
    }, this.speed * 1000);

    const startClearingTm = setTimeout(
      () => {
        startClearing = true;
        const countDownTimer = this.duration * 0.4 * 100;
        const int = setInterval(() => countDown++, countDownTimer);
      },
      this.duration * 0.5 * 1000
    );

    this.shuffleTimeout = setTimeout(() => {
      this.clearShuffle();
      clearTimeout(startClearingTm);

      this.targetNode.innerText = finalText;
    }, this.duration * 1000);
  }

  clearShuffle() {
    clearTimeout(this.shuffleTimeout);

    clearInterval(this.shuffleInterval);

    if (!this.differentNodes) {
      this.targetNode.removeAttribute(`data-shuffling`);
    }
  }
}
