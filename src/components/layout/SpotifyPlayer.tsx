import { useState } from 'react';

const SpotifyPlayer = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState('37i9dQZF1DX0XUsuxWHRQd'); // Default playlist - example
  
  const playlists = [
    { id: '37i9dQZF1DX0XUsuxWHRQd', name: 'Studio Sessions' },
    { id: '37i9dQZF1DX4dyzvuaRJ0n', name: 'Artist Showcase' },
    { id: '37i9dQZF1DX1lVhptIYRda', name: 'Latest Releases' }
  ];
  
  return (
    <section className="section-padding bg-black relative">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 parallax"
        style={{ backgroundImage: "url('/images/mlodyav.jpg')" }}
      ></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Our Sound</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Listen to tracks produced and mixed at Uncensored Studios. From underground hip-hop to experimental electronic, our sound is diverse but always authentic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-lg overflow-hidden shadow-white-sm">
              <iframe 
                src={`https://open.spotify.com/embed/playlist/${currentPlaylist}?utm_source=generator&theme=0`}
                width="100%" 
                height="380" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Player"
                className="border-0"
              ></iframe>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-secondary p-6 rounded-lg shadow-white-sm mb-6">
              <h3 className="text-white mb-4">Featured Playlists</h3>
              <div className="space-y-4">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => setCurrentPlaylist(playlist.id)}
                    className={`w-full text-left p-3 rounded-md transition-all ${
                      currentPlaylist === playlist.id 
                        ? 'bg-primary text-white' 
                        : 'bg-black text-gray-300 hover:bg-primary/20'
                    }`}
                  >
                    {playlist.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg shadow-white-sm">
              <h3 className="text-white mb-4">Follow Us</h3>
              <p className="text-gray-400 mb-4">
                Follow us on Spotify to stay updated with our latest releases and featured artists.
              </p>
              <a 
                href="https://open.spotify.com/user/uncensoredstudios" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button inline-block"
              >
                Follow on Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotifyPlayer;
