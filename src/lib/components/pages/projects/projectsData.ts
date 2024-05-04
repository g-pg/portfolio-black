import AxonWebsiteThumb from '$lib/assets/projects/axon-website/thumb.png';
import AxonWebsiteMobile from '$lib/assets/projects/axon-website/mobile.png';
import AxonWebsiteDesktopVideo from '$lib/assets/projects/axon-website/desktop-video.mp4';
import MuviDesktopVideo from '$lib/assets/projects/muvi/desktop-video.mp4';
import MuviMobile from '$lib/assets/projects/muvi/mobile.png';

import ConnectThumb from '$lib/assets/projects/connect/thumb.webp';
import ConnectDesktopVideo from '$lib/assets/projects/connect/desktop-video.mp4';
import ConnectMobile from '$lib/assets/projects/connect/mobile.png';

import HubDesktopVideo from '$lib/assets/projects/axon-hub/desktop-video.mp4';
export type Project = {
  shortName: string;
  fullName: string;
  mainColor: string;
  type?: string;
  texts: {
    company?: string;
    roles: string[];
    tools?: string[];
    description: string;
  };
  thumbnail: string;
  images?: {
    desktop?: string;
    mobile?: string;
  };
  videos?: {
    desktop?: string;
    mobile?: string;
  };
  links?: {
    url: string;
    github: string;
  };
};

export const projects: Project[] = [
  {
    shortName: 'Axon',
    fullName: 'Axon Technology',
    mainColor: '#008c6b',
    type: 'website',
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor', 'Designer (secundário)'],
      tools: ['TypeScript', 'Node.js', 'SvelteKit'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula gravida tortor vel ullamcorper. Proin porta ipsum at finibus convallis. In rutrum sapien purus, in accumsan urna feugiat quis. Curabitur lobortis libero sapien, non dapibus risus congue sit amet. Aliquam lorem ligula, pharetra nec faucibus euismod, finibus sed urna. Phasellus feugiat enim at quam ullamcorper fringilla. Nullam eget mauris justo. Donec non nulla id nunc consequat ornare ultricies sit amet mi. Quisque malesuada quam vel malesuada gravida.',
    },
    thumbnail: AxonWebsiteThumb,
    images: {
      mobile: AxonWebsiteMobile,
    },
    videos: {
      desktop: AxonWebsiteDesktopVideo,
    },
  },
  {
    shortName: 'Muvi',
    fullName: 'Muvi',
    mainColor: '#f72585',
    type: 'service',
    texts: {
      company: 'Projeto pessoal',
      roles: ['Desenvolvedor full stack', 'Designer'],
      tools: ['Node.js', 'NextJS'],
      description: 'Pellentesque vehicula gravida ',
    },
    thumbnail: MuviMobile,
    images: {
      mobile: MuviMobile,
    },
    videos: {
      desktop: MuviDesktopVideo,
    },
  },
  {
    shortName: 'Connect',
    fullName: 'Connect',
    mainColor: '#008c6b',
    type: 'dashboard',
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor front-end', 'Desenvolvedor back-end (secundário)', 'Designer (secundário)'],
      tools: ['TypeScript', 'SvelteKit', 'NodeJs', 'SQL'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula gravida tortor vel ullamcorper. Proin porta ipsum at finibus convallis. In rutrum sapien purus, in accumsan urna feugiat quis. Curabitur lobortis libero sapien, non dapibus risus congue sit amet. Aliquam lorem ligula, pharetra nec faucibus euismod, finibus sed urna. Phasellus feugiat enim at quam ullamcorper fringilla. Nullam eget mauris justo. Donec non nulla id nunc consequat ornare ultricies sit amet mi. Quisque malesuada quam vel malesuada gravida.',
    },
    thumbnail: ConnectThumb,
    images: {
      mobile: ConnectMobile,
    },
    videos: {
      desktop: ConnectDesktopVideo,
    },
  },
  {
    shortName: 'Hub',
    fullName: 'Axon Hub',
    mainColor: 'white',
    type: 'user manager',
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor front-end', 'Designer (secundário)'],
      tools: ['TypeScript', 'SvelteKit'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula gravida tortor vel ullamcorper. Proin porta ipsum at finibus convallis. In rutrum sapien purus, in accumsan urna feugiat quis. Curabitur lobortis libero sapien, non dapibus risus congue sit amet. Aliquam lorem ligula, pharetra nec faucibus euismod, finibus sed urna. Phasellus feugiat enim at quam ullamcorper fringilla. Nullam eget mauris justo. Donec non nulla id nunc consequat ornare ultricies sit amet mi. Quisque malesuada quam vel malesuada gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula gravida tortor vel ullamcorper. Proin porta ipsum at finibus convallis. In rutrum sapien purus, in accumsan urna feugiat quis. Curabitur lobortis libero sapien, non dapibus risus congue sit amet. Aliquam lorem ligula, pharetra nec faucibus euismod, finibus sed urna. Phasellus feugiat enim at quam ullamcorper fringilla. Nullam eget mauris justo. Donec non nulla id nunc consequat ornare ultricies sit amet mi. Quisque malesuada quam vel malesuada gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula gravida tortor vel ullamcorper. Proin porta ipsum at finibus convallis. In rutrum sapien purus, in accumsan urna feugiat quis. Curabitur lobortis libero sapien, non dapibus risus congue sit amet. Aliquam lorem ligula, pharetra nec faucibus euismod, finibus sed urna. Phasellus feugiat enim at quam ullamcorper fringilla. Nullam eget mauris justo. Donec non nulla id nunc consequat ornare ultricies sit amet mi. Quisque malesuada quam vel malesuada gravida.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vehicula gravida tortor vel ullamcorper. Proin porta ipsum at finibus convallis. In rutrum sapien purus, in accumsan urna feugiat quis. Curabitur lobortis libero sapien, non dapibus risus congue sit amet. Aliquam lorem ligula, pharetra nec faucibus euismod, finibus sed urna. Phasellus feugiat enim at quam ullamcorper fringilla. Nullam eget mauris justo. Donec non nulla id nunc consequat ornare ultricies sit amet mi. Quisque malesuada quam vel malesuada gravida.',
    },
    thumbnail: ConnectThumb,
    // images: {
    // 	mobile: MuviMobile,
    // },
    videos: {
      desktop: HubDesktopVideo,
    },
  },
];
