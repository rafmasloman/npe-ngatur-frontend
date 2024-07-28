import { SVGProps } from 'react';

export interface IconInterfaceProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  primaryColor?: string;
  secondaryColor?: string;
}
