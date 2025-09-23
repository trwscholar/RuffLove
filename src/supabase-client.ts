import { createClient } from "@supabase/supabase-js";

// ✅ Your project details
const supabaseUrl = "https://quodelyrvbgydzvnybmp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1b2RlbHlydmJneWR6dm55Ym1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDg0OTcsImV4cCI6MjA3NDE4NDQ5N30.2ycwhEWAShu7e3P9p7Jfg4Ne5zx0asLp9f8FrbFTNUE";

// ✅ Create the client with your URL + anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
