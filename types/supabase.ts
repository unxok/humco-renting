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
          cats_allowed: string | null
          description: string | null
          dogs_allowed: string | null
          full_address: string | null
          id: number
          is_listed: boolean
          lease_length: string | null
          listed_at: string | null
          pm_id: number | null
          pm_id_plus_listed_date: string
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
          cats_allowed?: string | null
          description?: string | null
          dogs_allowed?: string | null
          full_address?: string | null
          id?: number
          is_listed?: boolean
          lease_length?: string | null
          listed_at?: string | null
          pm_id?: number | null
          pm_id_plus_listed_date: string
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
          cats_allowed?: string | null
          description?: string | null
          dogs_allowed?: string | null
          full_address?: string | null
          id?: number
          is_listed?: boolean
          lease_length?: string | null
          listed_at?: string | null
          pm_id?: number | null
          pm_id_plus_listed_date?: string
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
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
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
