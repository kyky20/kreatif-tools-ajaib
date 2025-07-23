// src/hooks/useProfile.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const useProfile = () => {
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, email")
          .eq("id", user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};
