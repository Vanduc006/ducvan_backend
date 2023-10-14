import { createClient } from '@supabase/supabase-js';
// Khởi tạo một kết nối đến Supabase
const supabase = createClient('https://myfdqawmzovlouhecepo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZmRxYXdtem92bG91aGVjZXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyMjA4NTUsImV4cCI6MjAxMjc5Njg1NX0.8UXB-5owTd7tudPSVR80j7pQCSuNON342wGVWvXZXZU');
export default supabase