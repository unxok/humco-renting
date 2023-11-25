export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      listing_likes: {
        Row: {
          created_at: string
          id: number
          listing_id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          listing_id: number
          profile_id: string
        }
        Update: {
          created_at?: string
          id?: number
          listing_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_likes_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      listings: {
        Row: {
          address_city: string | null
          address_state: string | null
          address_street1: string | null
          address_street2: string | null
          address_zip: string | null
          admin_hidden: boolean
          amenities: string | null
          application_fee: number | null
          available_date: string | null
          bathrooms: number | null
          bedrooms: number | null
          building_type: string | null
          cats_allowed: boolean | null
          description: string | null
          dogs_allowed: boolean | null
          full_address: string | null
          id: number
          is_listed: boolean
          lease_length: string | null
          likes: number
          listed_at: string | null
          picture_urls: string[] | null
          pm_id: number | null
          pm_id_plus_pmListingId: string
          property_management_id: number | null
          rent: number | null
          scraped_at: string
          security_deposit: number | null
          square_feet: number | null
          thumbnail_url: string | null
        }
        Insert: {
          address_city?: string | null
          address_state?: string | null
          address_street1?: string | null
          address_street2?: string | null
          address_zip?: string | null
          admin_hidden?: boolean
          amenities?: string | null
          application_fee?: number | null
          available_date?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_type?: string | null
          cats_allowed?: boolean | null
          description?: string | null
          dogs_allowed?: boolean | null
          full_address?: string | null
          id?: number
          is_listed?: boolean
          lease_length?: string | null
          likes?: number
          listed_at?: string | null
          picture_urls?: string[] | null
          pm_id?: number | null
          pm_id_plus_pmListingId: string
          property_management_id?: number | null
          rent?: number | null
          scraped_at?: string
          security_deposit?: number | null
          square_feet?: number | null
          thumbnail_url?: string | null
        }
        Update: {
          address_city?: string | null
          address_state?: string | null
          address_street1?: string | null
          address_street2?: string | null
          address_zip?: string | null
          admin_hidden?: boolean
          amenities?: string | null
          application_fee?: number | null
          available_date?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          building_type?: string | null
          cats_allowed?: boolean | null
          description?: string | null
          dogs_allowed?: boolean | null
          full_address?: string | null
          id?: number
          is_listed?: boolean
          lease_length?: string | null
          likes?: number
          listed_at?: string | null
          picture_urls?: string[] | null
          pm_id?: number | null
          pm_id_plus_pmListingId?: string
          property_management_id?: number | null
          rent?: number | null
          scraped_at?: string
          security_deposit?: number | null
          square_feet?: number | null
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_property_management_id_fkey"
            columns: ["property_management_id"]
            isOneToOne: false
            referencedRelation: "property-managements"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          is_admin: boolean
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "property-managements": {
        Row: {
          created_at: string
          id: number
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
