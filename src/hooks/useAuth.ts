import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return { user };
}
