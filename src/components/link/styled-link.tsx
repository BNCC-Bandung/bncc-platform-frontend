import * as React from "react";

import { cn } from "@/lib/utils";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/link/unstyled-link";

const StyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          "text-blue-400 hover:underline cursor-pointer",
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

StyledLink.displayName = "StyledLink";

export default StyledLink;
