import { useState } from 'react';
import OverlayLayer from '../../components/OverlayLayer';
import Tile from '../../components/Tile';
import VolumetricText from '../../components/VolumetricText';
import getImageUrl from '../../utils/getImageUrl';

const tileImage = getImageUrl('background', 'jpg');

export default function PreviewSection() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  return (
    <div className='w-screen h-screen top-0 left-0 relative overflow-hidden'>
      {isModelsLoaded && (
        <>
          <Tile image={tileImage} />
          <OverlayLayer />
        </>
      )}
      <div className='w-screen h-screen top-0 left-0 absolute overflow-hidden'>
        <VolumetricText setIsModelsLoaded={setIsModelsLoaded} word='SOMEFOLK' />
      </div>
    </div>
  );
}
