import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://baoxdvanlxhyqrpnauol.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhb3hkdmFubHhoeXFycG5hdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODQ5NzAsImV4cCI6MjA2ODI2MDk3MH0.Ji6ibf_acOh0BWnqfeVnQjX_Za6GJWRgShG6NWglAL0";

export const supabase = createClient(supabaseUrl, supabaseKey);
