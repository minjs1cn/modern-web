import { FC } from 'react';

const BaseLayout: FC = ({ children }) => (
  <div style={{ height: '100vh' }}>{children}</div>
);

export default BaseLayout;
