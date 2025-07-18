import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

type VisibilityAnimationProps = {
  Duration: number;
  children: (args: { inView: boolean }) => React.ReactNode;
};

const VisibilityAnimation = ({
  Duration,
  children,
}: VisibilityAnimationProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const styles = useSpring({
    opacity: inView ? 1 : 0,
    config: { duration: Duration },
  });

  return (
    <animated.div ref={ref} style={styles}>
      {children({ inView })}
    </animated.div>
  );
};

export default VisibilityAnimation;
