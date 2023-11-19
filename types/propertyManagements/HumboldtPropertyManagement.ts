export type ListingHPM = {
  google_map_url: string;
  address_latitude: number;
  database_url: string;
  allow_guest_cards: boolean;
  logo_url: string;
  rental_application_url: string;
  available: boolean;
  advertised_lease_term: string;
  portfolio_postal_code: string;
  full_address: string;
  utilities: string;
  photos: Photo[];
  portfolio_url: string;
  dogs: string;
  unit_template_uuid: number;
  portfolio_location: PortfolioLocation;
  square_feet: number;
  id: number;
  property_uid: string;
  payee_account_number_token: string;
  posted_to_website_at: string;
  contact_phone_number: string;
  payee_routing_number: string;
  revenue_management_property: boolean;
  property_lists: PropertyList[];
  youtube_video_url: string;
  rent_or_starting_at: string;
  bathrooms: number;
  address_address2: string;
  address_address1: string;
  bedrooms: number;
  meta_description: string;
  listable_uid: string;
  portfolio_address2: string;
  portfolio_address1: string;
  contact_email_address: string;
  deposit: number;
  application_fee: number;
  admin_fee_payee_account_number_token: string;
  allow_submitting_online_applications: boolean;
  amenities: string;
  admin_fee_payee_routing_number: string;
  move_in_prices: string;
  admin_fee: string;
  posted_to_website: number;
  portfolio_city: string;
  appliances: string;
  by_the_bed: boolean;
  address_state: string;
  created_at: string;
  marketing_title: string;
  unit_template_name: string;
  default_photo_thumbnail_url: string;
  updated_at: string;
  fee_label: string;
  address_longitude: number;
  property_type: string;
  market_rent: number;
  affordable: boolean;
  portfolio_phone_number: string;
  virtual_showing: boolean;
  posted_to_internet: number;
  database_name: string;
  address_postal_code: string;
  address_country: string;
  available_date: string;
  portfolio_name: string;
  marketing_description: string;
  address_city: string;
  property_year_built: number;
  bedroom_type: string;
  portfolio_country: string;
  cats: string;
  youtube_video_id: number;
  portfolio_state: string;
  location: Location;
  schedule_showing_url: string;
};

type Location = {
  address: Address;
  geo: Geo;
};

type Address = {
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

type Geo = {
  latitude: string;
  longitude: string;
};

type Photo = {
  url: string;
};

type PortfolioLocation = {
  address: Address;
};

type PropertyList = {
  id: number;
  name: string;
};
