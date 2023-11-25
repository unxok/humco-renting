"use server";

import { ListingHPM } from "@/types/propertyManagements/HumboldtPropertyManagement";
import { Database } from "@/types/supabase";
import sbServer from "@/utils/supabase/SupabaseClients/sbServer";
import puppeteer from "puppeteer";

const getListings = async () => {
  const db = sbServer();

  const listingsToInsert: Omit<
    Database["public"]["Tables"]["listings"]["Row"],
    "id" | "admin_hidden" | "likes"
  >[] = [];

  const propertyManagementsQuery = await db
    .from("property-managements")
    .select("id, name");
  const propertyManagements = propertyManagementsQuery.data
    ? propertyManagementsQuery.data
    : [];
  const pmMap: { [key: string]: number } = propertyManagements.reduce(
    (map, pm) => {
      return {
        ...map,
        [pm.name]: pm.id,
      };
    },
    {}
  );
  console.log("pmMap", pmMap);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on("response", async (res) => {
    try {
      const json = await res.json();

      // console.log(json);
      if (json.name) {
        console.log("made it through");
        json.values.forEach(({ data }: { data: ListingHPM }) => {
          listingsToInsert.push({
            address_city: data.address_city,
            address_state: data.address_state,
            address_street1: data.address_address1,
            address_street2: data.address_address2,
            address_zip: data.address_postal_code,
            amenities: data.amenities,
            application_fee: data.application_fee,
            available_date: data.available_date,
            bathrooms: data.bathrooms,
            bedrooms: data.bedrooms,
            building_type: data.property_type,
            cats_allowed: data.cats.includes("not")
              ? false
              : data.cats.includes("unspecified")
              ? null
              : true,
            description: data.marketing_title,
            dogs_allowed: data.dogs.includes("not")
              ? false
              : data.cats.includes("unspecified")
              ? null
              : true,
            full_address: data.full_address,
            lease_length: data.advertised_lease_term,
            is_listed: true,
            listed_at: data.posted_to_website_at,
            picture_urls: data.photos.map(({ url }: { url: string }) => url),
            pm_id: data.id,
            pm_id_plus_pmListingId: data.id + data.listable_uid,
            property_management_id: pmMap[data.portfolio_name],
            rent: data.market_rent,
            scraped_at: new Date().toISOString().toString(),
            security_deposit: data.deposit,
            square_feet: data.square_feet,
            thumbnail_url: data.photos[0] ? data.photos[0].url : "",
          });
        });

        // 'unlist' all listings
        const unlistAllQuery = await db
          .from("listings")
          .update({ is_listed: false })
          .eq("is_listed", true);
        console.log("error in ulisting?", unlistAllQuery.error);

        const upsertOperation = await db
          .from("listings")
          .upsert(listingsToInsert, {
            onConflict: "pm_id_plus_pmListingId",
            ignoreDuplicates: false,
          });
        console.log("upsert data", upsertOperation.data);
        console.log("Any errors in the upsert: ", upsertOperation.error);
      }
    } catch (e) {
      // console.log(e);
    }
  });

  console.log("scraping started");
  await page.goto("https://www.humboldtrentals.com/vacancies", {
    waitUntil: "networkidle0",
  });

  await browser.close();
  console.log("scraping ended");

  return;
};

export default getListings;
