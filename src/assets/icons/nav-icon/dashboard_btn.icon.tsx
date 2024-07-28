import { IconInterfaceProps } from '../Icon.interface';

const ICDashboardButton: React.FC<IconInterfaceProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5001 1.04163L22.3959 6.77079V18.2291L12.5001 23.9583L2.60425 18.2291V6.77079L12.5001 1.04163ZM5.723 7.37288L12.5001 11.2958L19.2772 7.37288L12.5001 3.44788L5.723 7.37288ZM4.68758 9.18017V17.0281L11.4584 20.9479V13.101L4.68758 9.18017ZM13.5417 20.9479L20.3126 17.0281V9.18017L13.5417 13.1V20.9479Z"
        fill="white"
      />
    </svg>
  );
};

export default ICDashboardButton;
