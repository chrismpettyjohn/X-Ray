import React, {HTMLAttributes} from 'react';

export function SiteLogo({...props}: HTMLAttributes<HTMLImageElement>) {
  return (
    <div
      {...props}
      style={{
        height: 100,
        width: '100%',
        textAlign: 'center',
        overflow: 'hidden',
        ...props?.style,
      }}
    >
      Logo
    </div>
  );
}
