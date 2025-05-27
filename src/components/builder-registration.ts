import { Builder } from '@builder.io/react';
import Hero from './Hero';
import Services from './Services';
import Pricing from './Pricing';
import AboutSection from './AboutSection';
import WhyUncensored from './WhyUncensored';
import CallToAction from './CallToAction';
import SpotifyPlayer from './SpotifyPlayer';

// Register all components with Builder.io
export function registerLayoutComponents() {
  Builder.registerComponent(Hero, {
    name: 'Hero Section',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'THE SOUND OF THE UNDERGROUND.'
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'Premium Recording and Production Studio in East London.'
      },
      {
        name: 'backgroundVideo',
        type: 'file',
        allowedFileTypes: ['mp4', 'webm'],
        defaultValue: '/images/8118111-uhd_3840_2160_24fps.mp4'
      },
      {
        name: 'mobileBackgroundVideo',
        type: 'file',
        allowedFileTypes: ['mp4', 'webm'],
        defaultValue: '/images/8114941-uhd_2160_3840_24fps.mp4'
      },
      {
        name: 'logo',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'avif'],
        defaultValue: '/images/Uncensored Studios Transparent .png'
      },
      {
        name: 'primaryButtonText',
        type: 'string',
        defaultValue: 'BOOK STUDIO'
      },
      {
        name: 'primaryButtonLink',
        type: 'string',
        defaultValue: '/book'
      },
      {
        name: 'secondaryButtonText',
        type: 'string',
        defaultValue: 'EXPLORE SERVICES'
      },
      {
        name: 'secondaryButtonLink',
        type: 'string',
        defaultValue: '/services'
      }
    ]
  });

  Builder.registerComponent(Services, {
    name: 'Services Section',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Our Services'
      },
      {
        name: 'services',
        type: 'list',
        subFields: [
          {
            name: 'title',
            type: 'string'
          },
          {
            name: 'description',
            type: 'string'
          },
          {
            name: 'icon',
            type: 'string',
            enum: ['Mic', 'Music', 'Sliders', 'Volume2']
          }
        ],
        defaultValue: [
          {
            title: 'Recording',
            description: 'Professional vocal and instrument recording in our acoustically treated studio.',
            icon: 'Mic'
          },
          {
            title: 'Production',
            description: 'Full music production services from beat-making to arrangement and sound design.',
            icon: 'Music'
          },
          {
            title: 'Mixing',
            description: 'Detailed mixing to ensure your tracks sound balanced and professional on any system.',
            icon: 'Sliders'
          },
          {
            title: 'Mastering',
            description: 'Final polish to make your music ready for commercial release across all platforms.',
            icon: 'Volume2'
          }
        ]
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
        defaultValue: '/images/team.jpg'
      }
    ]
  });

  Builder.registerComponent(Pricing, {
    name: 'Pricing Section',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Studio Rates'
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'Transparent pricing with no hidden fees.'
      },
      {
        name: 'plans',
        type: 'list',
        subFields: [
          {
            name: 'title',
            type: 'string'
          },
          {
            name: 'priceHourly',
            type: 'string'
          },
          {
            name: 'priceDaily',
            type: 'string'
          },
          {
            name: 'features',
            type: 'list',
            itemType: 'string'
          },
          {
            name: 'buttonText',
            type: 'string'
          },
          {
            name: 'buttonLink',
            type: 'string'
          },
          {
            name: 'popular',
            type: 'boolean'
          }
        ],
        defaultValue: [
          {
            title: 'Dry Hire',
            priceHourly: '£60',
            priceDaily: '£350',
            features: [
              'Studio access without engineer',
              'Pro Tools or Logic Pro X',
              'Basic technical support',
              'Access to microphone collection'
            ],
            buttonText: 'Book Dry Hire',
            buttonLink: '/book',
            popular: false
          },
          {
            title: 'Engineer Session',
            priceHourly: '£90',
            priceDaily: '£500',
            features: [
              'Professional sound engineer',
              'Full equipment access',
              'Basic mixing included',
              'Session backup'
            ],
            buttonText: 'Book With Engineer',
            buttonLink: '/book',
            popular: true
          },
          {
            title: 'Production Package',
            priceHourly: '£120',
            priceDaily: '£700',
            features: [
              'Producer & engineer',
              'Beat production',
              'Arrangement assistance',
              'Basic mixing & mastering'
            ],
            buttonText: 'Book Production',
            buttonLink: '/book',
            popular: false
          }
        ]
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
        defaultValue: '/images/xero.jpg'
      }
    ]
  });

  Builder.registerComponent(AboutSection, {
    name: 'About Section',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'About Uncensored Studios'
      },
      {
        name: 'description',
        type: 'longText',
        defaultValue: 'Founded in East London, Uncensored Studios was born from a desire to break down the barriers between artists and professional recording. We believe that high-quality sound shouldn\'t be gatekept by industry politics or excessive costs.'
      },
      {
        name: 'teamImages',
        type: 'list',
        subFields: [
          {
            name: 'image',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif']
          },
          {
            name: 'alt',
            type: 'string'
          }
        ],
        defaultValue: [
          {
            image: '/images/mlodyav.jpg',
            alt: 'Team member 1'
          },
          {
            image: '/images/xero.jpg',
            alt: 'Team member 2'
          }
        ]
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
        defaultValue: '/images/guys.avif'
      }
    ]
  });

  Builder.registerComponent(WhyUncensored, {
    name: 'Why Choose Us Section',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Why Choose Uncensored Studios'
      },
      {
        name: 'features',
        type: 'list',
        subFields: [
          {
            name: 'title',
            type: 'string'
          },
          {
            name: 'description',
            type: 'string'
          }
        ],
        defaultValue: [
          {
            title: 'No Gatekeeping',
            description: 'We believe in open access to professional recording. No industry politics, no barriers—just great sound for everyone.'
          },
          {
            title: 'East London Authenticity',
            description: 'Born from the underground scene, we bring raw authenticity to every project while maintaining professional standards.'
          },
          {
            title: 'Artist-First Approach',
            description: 'Your vision is our priority. We\'re here to enhance your sound, not change it.'
          },
          {
            title: 'Technical Excellence',
            description: 'Premium equipment and acoustically treated spaces ensure your recordings sound professional every time.'
          }
        ]
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
        defaultValue: '/images/team.jpg'
      }
    ]
  });

  Builder.registerComponent(CallToAction, {
    name: 'Call To Action Section',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Ready to create your next hit?'
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'Book our studio today and bring your vision to life.'
      },
      {
        name: 'buttonText',
        type: 'string',
        defaultValue: 'BOOK NOW'
      },
      {
        name: 'buttonLink',
        type: 'string',
        defaultValue: '/book'
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
        defaultValue: '/images/xero.jpg'
      }
    ]
  });

  Builder.registerComponent(SpotifyPlayer, {
    name: 'Spotify Player',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Listen to Our Artists'
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: 'Check out some of the tracks produced at Uncensored Studios.'
      },
      {
        name: 'spotifyEmbedUrl',
        type: 'string',
        defaultValue: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd'
      },
      {
        name: 'height',
        type: 'number',
        defaultValue: 380
      }
    ]
  });
}
