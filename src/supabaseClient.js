import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yeiqporfdialbwwvckxz.supabase.co';
const supabaseAnonKey = 'sb_publishable_j8yQISTzEUfbvy0OakEKRg_SuhjMD-c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
