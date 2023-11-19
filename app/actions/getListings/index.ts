"use server";

import { ListingHPM } from "@/types/propertyManagements/HumboldtPropertyManagement";
import puppeteer from "puppeteer";

const getListings = async () => {
  console.log("hi");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const listings: ListingHPM[] = [];

  page.on("response", async (res) => {
    try {
      const json = await res.json();

      // console.log(json);
      if (json.name) {
        json.values.forEach(({ data }: { data: ListingHPM }) => {
          listings.push(data);
        });
        listings.push(json.values[0].data);
      }
    } catch (e) {
      // console.log(res.url());
    }
  });

  await page.goto("https://www.humboldtrentals.com/vacancies", {
    waitUntil: "networkidle0",
  });

  await browser.close();

  return listings;
};

export default getListings;
