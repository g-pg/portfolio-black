import AxonWebsiteThumb from '$lib/assets/projects/axon-website/thumb.png';
import AxonWebsiteMobile from '$lib/assets/projects/axon-website/mobile.png';
import AxonWebsiteDesktopVideo from '$lib/assets/projects/axon-website/desktop-video.mp4';
import MuviDesktopVideo from '$lib/assets/projects/muvi/desktop-video.mp4';
import MuviMobile from '$lib/assets/projects/muvi/mobile.png';
import ConnectThumb from '$lib/assets/projects/connect/thumb.webp';
import ConnectDesktopVideo from '$lib/assets/projects/connect/desktop-video.mp4';
import ConnectMobile from '$lib/assets/projects/connect/mobile.png';
import HubDesktopVideo from '$lib/assets/projects/axon-hub/desktop-video.mp4';
import OldPortfolioDesktopImage from '$lib/assets/projects/old-portfolio/desktop.png';
import OldPortfolioMobileImage from '$lib/assets/projects/old-portfolio/mobile.png';
import OitoDesktopVideo from '$lib/assets/projects/oito/desktop-video.mp4';
import OitoMobileImage from '$lib/assets/projects/oito/mobile.webp';

export type Project = {
  shortName: string;
  fullName: string;
  className: string;
  mainColor: string;
  enabled: boolean;
  type?: string;
  filterTools: ProjectFilterTool[];
  texts: {
    company?: string;
    roles: string[];
    tools: string[];
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
    url?: string;
    github?: string;
  };
};

export const projectTools = [
  // 'Javascript',
  'Typescript',
  // 'HTML',
  // 'CSS',
  // 'SASS',
  // 'GSAP',
  // 'Vite',
  'Svelte',
  'SvelteKit',
  'React',
  'Next',
  // 'Figma',
  'Mongo',
  'SQL',
  // 'Prisma',
  'Node',
  // 'Docker',
] as const;

export type ProjectFilterTool = (typeof projectTools)[number];

export const projects: Project[] = [
  {
    className: 'axon',
    shortName: 'Axon',
    fullName: 'Axon Technology',
    enabled: true,
    mainColor: '#008c6b',
    type: 'website',
    filterTools: ['SvelteKit', 'Svelte', 'Typescript', 'Node'],
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor', 'Co-designer'],
      tools: ['Typescript', 'Node', 'SvelteKit'],
      description: `Landing page da Axon Technology, empresa que vende soluções tecnológicas para a indústria.
        <br/>
        <br/>
        O objetivo era criar uma página que acompanhasse a identidade visual e demonstrasse a personalidade da empresa: moderna e ousada.
        Estas necessidades acompanharam todo o processo de desenvolvimento, desde a criação do slogan até o design da barra de navegação.
        <br/>
        <br/>
        A página do carro-chefe da empresa, o Connect, é a mais trabalhada, com transições de SVG em modelos 3D e elementos interativos que demonstram algumas possibilidades do produto.

        `,
    },
    thumbnail: AxonWebsiteThumb,
    images: {
      mobile: AxonWebsiteMobile,
    },
    videos: {
      desktop: AxonWebsiteDesktopVideo,
    },
    links: {
      url: 'https://axontechnology.com.br/',
    },
  },
  {
    className: 'muvi',
    shortName: 'Muvi',
    fullName: 'Muvi',
    enabled: true,
    mainColor: '#f72585',
    type: 'service',
    filterTools: ['Typescript', 'Node', 'Mongo', 'React', 'Next'],
    texts: {
      company: 'Projeto pessoal',
      roles: ['Desenvolvedor full stack', 'Designer'],
      tools: ['Next', 'NextAuth', 'Prisma', 'Mongo'],
      description: `Muvi (que eu decidi chamar assim porque o nome era curto e legal o suficiente para soar como uma marca) é uma daquelas aplicações baseadas em listas de usuário, feita nos meus primeiros meses de estudo.
      <br/><br/>
       O usuário pode criar uma conta para registrar os filmes que já assistiu e aqueles que quer assistir. Os dados dos filmes são providenciados pela TMDB, e os dados específicos da aplicação, como usuários e suas listas, são guardados um banco de dados Mongo.
       <br/><br/>
       Todas as rotas e serviços foram feitos no próprio backend do NextJS, porque era meu objeto de estudo à época. Para autenticação, utilizei o NextAuth (agora Auth.js). Como ORM, utilizei Prisma.
       <br/><br/>
       Por ser um projeto de estudos, escrevi <a class="underline" target="_blank" href="https://dev.to/gpg/nextjs-criando-um-site-fullstack-com-autenticacao-e-database-7fh">um artigo no dev.to</a> para detalhar todos os meus passos.
       Há mais detalhes sobre a aplicação no seu repositório! 
      `,
    },
    thumbnail: MuviMobile,
    images: {
      mobile: MuviMobile,
    },
    videos: {
      desktop: MuviDesktopVideo,
    },
    links: {
      url: 'https://gpg-muvi.vercel.app/user',
      github: 'https://github.com/g-pg/muvi',
    },
  },
  {
    className: 'connect',
    shortName: 'Connect',
    fullName: 'Connect',
    enabled: true,
    mainColor: '#008c6b',
    type: 'dashboard',
    filterTools: ['SvelteKit', 'Svelte', 'Typescript', 'Node', 'SQL'],
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor full stack', 'Designer'],
      tools: ['SvelteKit', 'Typescript', 'Node', 'SQL'],
      description: `O Connect, carro-chefe da Axon Technology, é um dispositivo IIOT que captura dados de desempenho de máquinas industriais. O meu papel é desenvolver a interface da aplicação, criar gráficos e outros meios de visualização de dados. Ocasionalmente, participo do desenvolvimento do backend, produzindo ou auxiliando a criação de novas features.
      <br/><br/>
        Por tratar-se de uma aplicação industrial, que frequentemente é mostrada em TVs ou telões, optei por utilizar elementos grandes e cores vivas e facilmente distinguíveis para identificar propriedades como turnos de trabalho e status de máquinas. 
        <br/><br/>
        Como uma das propostas do Connect é a "visualização de dados em qualquer lugar", outro ponto focal foi a responsividade da aplicação, o que, em se tratando de gráficos que costumam ocupar toda a tela, não é simples, mas contornável com um pouco de criatividade.
        <br/><br/>
        Além disso, a preocupação com a rapidez da aplicação é sempre levada a sério: um grande volume de dados chega a cada segundo, e cada uma das máquinas possui o seu próprio conjunto de informações. O manejamento de estados e controle de renderizações é crucial para o bom desempenho da aplicação.
        `,
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
    className: 'hub',
    shortName: 'Hub',
    fullName: 'Axon Hub',
    enabled: true,
    mainColor: 'white',
    type: 'user manager',
    filterTools: ['SvelteKit', 'Svelte', 'Typescript'],
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor front-end', 'Designer (secundário)'],
      tools: ['Typescript', 'SvelteKit'],
      description: `O Axon Hub é a central de aplicações da Axon. Como cada aplicação carrega a sua identidade, o visual da central precisava refletir mais a empresa do que um produto específico.
        <br/><br/>
        Em relação ao desenvolvimento do front-end, trata-se de uma aplicação completa para o gerenciamento de usuários: tabelas para visualização, telas de cadastro, edição e configurações de cada aplicação.
        <br/><br/>
        Cada uma dessas features foi pensada com vistas à fluidez e experiência do usuário, com toasts , loaders e outras dicas visuais para a finalização de requisições ao servidor e manejamento de stores para "cachear" todos os dados possíveis e garantir a rapidez na sua utilização.
        `,
    },
    thumbnail: ConnectThumb,
    videos: {
      desktop: HubDesktopVideo,
    },
  },
  {
    className: 'old_portfolio',
    shortName: 'Portfolio [old]',
    fullName: 'Antigo portfólio',
    enabled: true,
    mainColor: 'white',
    type: 'website',
    filterTools: ['Next', 'Typescript', 'Node', 'React'],
    texts: {
      company: 'Projeto pessoal',
      roles: ['Desenvolvedor', 'Designer'],
      tools: ['Next', 'Typescript'],
      description: `
      Meu primeiro portfólio. Simples, simples, mas tenho um tremendo orgulho dele.
        `,
    },
    thumbnail: ConnectThumb,
    images: {
      mobile: OldPortfolioMobileImage,
      desktop: OldPortfolioDesktopImage,
    },
    links: {
      url: 'https://gpg-portfolio-old.vercel.app/',
      github: 'https://github.com/g-pg/portfolio',
    },
  },
  {
    className: 'oito',
    shortName: "Oh! It's That One",
    fullName: "Oh! It's That One",
    enabled: true,
    mainColor: 'white',
    type: 'website',
    filterTools: ['Next', 'Typescript', 'Node', 'React'],
    texts: {
      company: 'Projeto pessoal',
      roles: ['Desenvolvedor', 'Designer'],
      tools: ['Next', 'Typescript'],
      description: `Um <i>guess the song</i>. Cole uma playlist do YouTube, escolha por quanto tempo cada música vai tocar e quanto tempo você tem até acertar.
      É um jogo especialmente divertido para conhece a discografia de um arista de trás pra frente.`,
    },
    thumbnail: ConnectThumb,
    images: {
      mobile: OitoMobileImage,
    },
    videos: {
      desktop: OitoDesktopVideo,
    },
    links: {
      url: 'https://ohitsthatone.vercel.app/',
      // github: 'https://github.com/g-pg/portfolio',
    },
  },
];
