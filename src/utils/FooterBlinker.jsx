import React from 'react';

const FooterBlinker = () => {
  // Expanded neon palette
  const neonPalette = [
    ['#0ff', '#f0f', '#ff0'],      // cyan, magenta, yellow
    ['#00FF00', '#FF00FF', '#00FFFF'], // neon green, pink, cyan :contentReference[oaicite:1]{index=1}
    ['#FFFF00', '#FF3300', '#00FF33'], // neon yellow, red-orange, lime green :contentReference[oaicite:2]{index=2}
  ];

  return (
    <section className="w-screen m-0 h-[25vh]  flex max-tablet:flex-col max-tablet:h-auto max-tablet:gap-10 max-tablet:pl-[22px] justify-evenly">
      {/* Top row */}
      <div className="flex w-full justify-evenly">
        {[0, 1, 2].map((colIdx) => (
          <div key={colIdx}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {colIdx === 0 && (
                <>
                  {[ [60,60],[60,140],[140,140],[100,100],[140,60] ].map((xy, i) => (
                    <circle key={i} cx={xy[0]} cy={xy[1]} r="60" fill="white">
                      <animate
                        attributeName="fill"
                        values={`white;${neonPalette[colIdx].join(';')};white`}
                        begin={`${colIdx * 1.2}s`}
                        dur="3s"
                        calcMode="discrete"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </>
              )}
              {colIdx === 1 && (
                <>
                  {[ [50,50],[50,150],[150,150],[150,50] ].map((xy, i) => (
                    <circle key={i} cx={xy[0]} cy={xy[1]} r="50" fill="white">
                      <animate
                        attributeName="fill"
                        values={`white;${neonPalette[colIdx].join(';')};white`}
                        begin={`${colIdx * 1.2}s`}
                        dur="3s"
                        calcMode="discrete"
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </>
              )}
              {colIdx === 2 && (
                <>
                  <circle cx="100" cy="100" r="100" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="100" cy="100" r="40" fill="black" />
                  <rect x="0" y="0" width="100" height="100" fill="black" />
                </>
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex w-full justify-evenly">
        {[0, 1, 2].map((colIdx) => (
          <div key={colIdx}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {colIdx === 0 && (
                <>
                  <circle cx="0" cy="100" r="100" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="200" cy="100" r="100" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
              {colIdx === 1 && (
                <>
                  <polygon points="0,100 200,100 100,0" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </polygon>
                  <polygon points="0,200 200,200 100,100" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </>
              )}
              {colIdx === 2 && (
                <>
                  <polygon points="0,0 100,0 200,100 100,100" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </polygon>
                  <polygon points="0,100 100,100 200,200 100,200" fill="white">
                    <animate
                      attributeName="fill"
                      values={`white;${neonPalette[colIdx].join(';')};white`}
                      begin={`${colIdx * 1.2}s`}
                      dur="3s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </>
              )}
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterBlinker;
