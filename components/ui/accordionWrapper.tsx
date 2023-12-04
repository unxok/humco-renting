import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

type AccordionWrapperProps = {
  triggerText: string;
  children: ReactNode;
  className: string;
  value: string;
};

export const AccordionWrapper = ({
  children,
  className,
  triggerText,
  value,
}: AccordionWrapperProps) => (
  <Accordion type="single" collapsible>
    <AccordionItem value={value}>
      <AccordionTrigger>{triggerText}</AccordionTrigger>
      <AccordionContent className={className}>{children}</AccordionContent>
    </AccordionItem>
  </Accordion>
);
