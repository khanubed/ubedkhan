import React from 'react';

const FooterBlinker = () => {
  const neonPalette = [
    ['#0ff', '#f0f', '#ff0'],
    ['#00FF00', '#FF00FF', '#00FFFF'],
    ['#FFFF00', '#FF3300', '#00FF33'],
  ];

  const renderSVG = (colIdx, size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
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
  );

  const renderBottomSVG = (colIdx, size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
    >
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
  );

  return (
    <section className="w-screen m-0 h-auto flex flex-col tablet:flex-row items-center justify-evenly max-tablet:h-auto max-tablet:gap-6">
      {/* Top row */}
      <div className="flex justify-evenly w-full flex-wrap gap-2">
        {[0, 1, 2].map((colIdx) => (
          <div key={colIdx}>
            {/* Desktop version */}
            <div className="max-tablet:hidden">
              {renderSVG(colIdx, 200)}
            </div>
            {/* Mobile version */}
            <div className="tablet:hidden">
              {renderSVG(colIdx, 90)}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex justify-evenly w-full flex-wrap gap-2">
        {[0, 1, 2].map((colIdx) => (
          <div key={colIdx}>
            {/* Desktop version */}
            <div className="max-tablet:hidden">
              {renderBottomSVG(colIdx, 200)}
            </div>
            {/* Mobile version */}
            <div className="tablet:hidden">
              {renderBottomSVG(colIdx, 90)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterBlinker;
