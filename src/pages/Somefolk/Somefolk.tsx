import getImageUrl from '../../utils/getImageUrl';
import { useState } from 'react';
import Tile from '../../components/Tile';
import VolumetricText from '../../components/VolumetricText';
import ScreenWrapper from '../../components/ScreenWrapper';
import OverlayLayer from '../../components/OverlayLayer';

const tileImage = getImageUrl('background', 'jpg');

// ref: https://www.somefolk.co.uk/
export default function Somefolk() {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  return (
    <>
      <ScreenWrapper className='overflow-hidden bg-somefolk'>
        {isModelsLoaded && (
          <>
            <Tile image={tileImage} />
            <OverlayLayer />
          </>
        )}
        <ScreenWrapper position='absolute'>
          <VolumetricText setIsModelsLoaded={setIsModelsLoaded} word='SOMEFOLK' />
        </ScreenWrapper>
      </ScreenWrapper>
      <ScreenWrapper className='bg-somefolk'></ScreenWrapper>
    </>
  );
}
