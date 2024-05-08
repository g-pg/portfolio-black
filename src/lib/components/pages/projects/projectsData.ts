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
export type Project = {
  className: string;
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
    url?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    className: 'axon',
    shortName: 'Axon',
    fullName: 'Axon Technology',
    mainColor: '#008c6b',
    type: 'website',
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor', 'Co-designer'],
      tools: ['TypeScript', 'Node.js', 'SvelteKit'],
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
      url: 'private',
    },
  },
  {
    className: 'muvi',
    shortName: 'Muvi',
    fullName: 'Muvi',
    mainColor: '#f72585',
    type: 'service',
    texts: {
      company: 'Projeto pessoal',
      roles: ['Desenvolvedor full stack', 'Designer'],
      tools: ['NextJS', 'NextAuth', 'Prisma', 'Mongo'],
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
    mainColor: '#008c6b',
    type: 'dashboard',
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor front-end', 'Desenvolvedor back-end (secundário)', 'Co-designer'],
      tools: ['SvelteKit', 'TypeScript', 'NodeJs', 'SQL'],
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
    mainColor: 'white',
    type: 'user manager',
    texts: {
      company: 'Axon Technology',
      roles: ['Desenvolvedor front-end', 'Designer (secundário)'],
      tools: ['TypeScript', 'SvelteKit'],
      description: `O Axon Hub é a central de aplicações da Axon. Como cada aplicação carrega a sua identidade, o visual da central precisava refletir mais a empresa do que um produto específico.
        <br/><br/>
        Em relação ao desenvolvimento do front-end, trata-se de uma aplicação completa para o gerenciamento de usuários: tabelas para visualização, telas de cadastro, edição e configurações de cada aplicação.
        <br/><br/>
        Cada uma dessas features foi pensada com vistas à fluidez e experiência do usuário, com toasts , loaders e outras dicas visuais para a finalização de requisições ao servidor e manejamento de stores para "cachear" todos os dados possíveis e garantir a rapidez na sua utilização.
        `,
    },
    thumbnail: ConnectThumb,
    // images: {
    // 	mobile: MuviMobile,
    // },
    videos: {
      desktop: HubDesktopVideo,
    },
    links: {
      url: 'private',
    },
  },
  {
    className: 'old_portfolio',
    shortName: 'Portfolio [old]',
    fullName: 'Antigo portfólio',
    mainColor: 'white',
    type: 'website',
    texts: {
      company: 'Projeto pessoal',
      roles: ['Desenvolvedor', 'Designer'],
      tools: ['TypeScript', 'NextJS'],
      description: `
      Meu primeiro portfólio, do início da minha carreira. Simples, simples, simples, mas tenho um tremendo orgulho dele, porque ele contém algumas das coisas que gosto em uma página, como transições suaves e interações inesperadas (já tentou usar os controles de janela do prompt na Hero?). 
      <br><br>
      Deixo-o aqui menos como exemplo do que sei fazer, e mais como registro da minha evolução. 
        `,
    },
    thumbnail: ConnectThumb,
    // images: {
    // 	mobile: MuviMobile,
    // },

    images: {
      mobile: OldPortfolioMobileImage,
      desktop: OldPortfolioDesktopImage,
    },
    links: {
      url: 'https://gpg-portfolio-old.vercel.app/',
      github: 'https://github.com/g-pg/portfolio',
    },
  },
];
