import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rtvsivpojlipbagatrck.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dnNpdnBvamxpcGJhZ2F0cmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3OTI2NjMsImV4cCI6MjA5OTM2ODY2M30.8D-vVQHbXrZ5w0bgq7SE8QYR4k2g7ZMn-z6KcC4E7FA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
