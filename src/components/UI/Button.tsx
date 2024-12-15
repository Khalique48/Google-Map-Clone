import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  icon,
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
          'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;