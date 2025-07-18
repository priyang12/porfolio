import { Loader } from '@priyang/react-component-lib';
import { useNavigation } from 'react-router';

function NavigationLoading() {
  let navigation = useNavigation();
  if (navigation.state === 'idle') return null;
  return (
    <div className="glass-container fixed right-0 bottom-0 z-20 m-5 flex items-center justify-center p-5 sm:h-[15%] sm:w-[25%] md:h-1/4 md:w-1/4">
      <Loader className="h-[50px] w-[50px]" loadingText="Navigating..." />
    </div>
  );
}

export default NavigationLoading;
