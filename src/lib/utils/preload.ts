import { browser } from '$app/environment';

export async function preload(src: string | undefined, type: 'video' | 'img') {
  if (!src || !browser) return;

  if (type === 'img') {
    const image = new Image();
    image.src = src;
  }

  if (type === 'video') {
    const video = document.createElement('video');
    video.setAttribute('preload', 'auto');
    video.src = src;
    video.addEventListener('canplaythrough', () => {
      video.style.display = 'none';
      document.body.appendChild(video);
      video.remove();
    });
  }
}
