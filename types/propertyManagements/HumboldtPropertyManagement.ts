export type ListingHPM = {
  address_address1: string;
  address_address2: string;
  address_city: string;
  address_country: string;
  address_latitude: number;
  address_longitude: number;
  address_postal_code: string;
  address_state: string;
  admin_fee_payee_account_number_token: string;
  admin_fee_payee_routing_number: string;
  admin_fee: string;
  advertised_lease_term: string;
  affordable: boolean;
  allow_guest_cards: boolean;
  allow_submitting_online_applications: boolean;
  amenities: string;
  appliances: string;
  application_fee: number;
  available_date: string;
  available: boolean;
  bathrooms: number;
  bedroom_type: string;
  bedrooms: number;
  by_the_bed: boolean;
  cats: string;
  contact_email_address: string;
  contact_phone_number: string;
  created_at: string;
  database_name: string;
  database_url: string;
  default_photo_thumbnail_url: string;
  deposit: number;
  dogs: string;
  fee_label: string;
  full_address: string;
  google_map_url: string;
  id: number;
  listable_uid: string;
  location: Location;
  logo_url: string;
  market_rent: number;
  marketing_description: string;
  marketing_title: string;
  meta_description: string;
  move_in_prices: string;
  payee_account_number_token: string;
  payee_routing_number: string;
  photos: Photo[];
  portfolio_address1: string;
  portfolio_address2: string;
  portfolio_city: string;
  portfolio_country: string;
  portfolio_location: PortfolioLocation;
  portfolio_name: string;
  portfolio_phone_number: string;
  portfolio_postal_code: string;
  portfolio_state: string;
  portfolio_url: string;
  posted_to_internet: number;
  posted_to_website_at: string;
  posted_to_website: number;
  property_lists: PropertyList[];
  property_type: string;
  property_uid: string;
  property_year_built: number;
  rent_or_starting_at: string;
  rental_application_url: string;
  revenue_management_property: boolean;
  schedule_showing_url: string;
  square_feet: number;
  unit_template_name: string;
  unit_template_uuid: number;
  updated_at: string;
  utilities: string;
  virtual_showing: boolean;
  youtube_video_id: number;
  youtube_video_url: string;
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
