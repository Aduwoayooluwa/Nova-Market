import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-primary text-background px-6 py-3 font-medium shadow-md hover:shadow-sm hover:bg-background hover:border-foreground hover:border transition-all ease-linear hover:text-foreground outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
