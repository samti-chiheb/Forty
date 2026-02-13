
-- Create safety_logs table
create table safety_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  mood int not null,
  feeling text,
  risk_level text not null,
  action_taken text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table safety_logs enable row level security;

-- Policies
create policy "Users can insert their own logs"
  on safety_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own logs"
  on safety_logs for select
  using (auth.uid() = user_id);

-- (Future: Admin policy will be added later)
