import { Loading3QuartersOutlined } from '@ant-design/icons';
import { FC } from 'react';
import cs from 'classnames';
import styles from './LoadingOverlay.module.scss';

type LoadingOverlayProps = {
  fullscreen?: boolean;
  size?: number;
  color?: string;
};

const LoadingOverlay: FC<LoadingOverlayProps> = ({
  fullscreen,
  size = 28,
  color,
}) => {
  const className = cs(styles.loading, {
    [styles.fullscreen]: fullscreen,
  });
  return (
    <div className={className}>
      <Loading3QuartersOutlined
        spin={true}
        style={{
          fontSize: size,
          color,
        }}
      />
    </div>
  );
};

export default LoadingOverlay;
