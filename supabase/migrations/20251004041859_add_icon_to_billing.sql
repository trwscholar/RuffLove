/*
  # Add icon field to Billing table

  1. Changes
    - Add `icon` column to Billing table to store the selected icon name
    - Set default value to 'Heart' for existing records
  
  2. Notes
    - Icon field will store the name of the Lucide React icon to be displayed
    - Existing bills will default to 'Heart' icon
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Billing' AND column_name = 'icon'
  ) THEN
    ALTER TABLE "Billing" ADD COLUMN icon text DEFAULT 'Heart';
  END IF;
END $$;