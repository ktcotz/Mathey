import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const supabaseUrl = process.env.VITE_SUPABASE_TESTING_URL;
const supabaseKey = process.env.VITE_SUPABASE_TESTING_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createUsers() {
  const users = [
    {
      email: 'john.smith@example.com',
      password: 'Secure123!',
      firstName: 'John',
      lastName: 'Doe',
      city: 'New York',
    },
    {
      email: 'kamil.naskret@example.com',
      password: 'Secure123!',
      firstName: 'Kamil',
      lastName: 'Naskręt',
      city: 'Los Angeles',
    },
  ];

  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
    });

    if (error) {
      console.error('Error creating user:', error);
      continue;
    }

    const { id } = data.user;

    const { error: insertError } = await supabase.from('users').insert([
      {
        user_id: id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        city: user.city,
        details_complete: true,
      },
    ]);

    if (insertError) {
      console.error('Error inserting user into public.users:', insertError);
    } else {
      console.log(`Created user in public.users: ${user.email}`);
    }
  }
}

createUsers();
