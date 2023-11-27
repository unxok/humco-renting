import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ListingInformation } from "../ListingInformation";

// TODO fix type of data
export const ListingAccordion = ({ data }: { data: any }) => (
  <Accordion
    className="w-full rounded-md"
    // defaultValue='item-1'
    type="multiple"
    // collapsible
  >
    <AccordionItem
      value="item-1"
      className="border border-b-foreground p-1 rounded-t-sm"
    >
      <AccordionTrigger>Listing Details</AccordionTrigger>
      <AccordionContent>
        <ListingInformation data={data} />
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2" className="border border-b-gray-300 p-1">
      <AccordionTrigger>Full Description</AccordionTrigger>
      <AccordionContent>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.[0]?.long_description as string,
          }}
        ></div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
