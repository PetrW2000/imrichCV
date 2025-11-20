-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  email text,
  phone text,
  job_title text,
  linkedin_url text,
  credits int default 10,
  is_onboarding_complete boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EXPERIENCES
create table public.experiences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  company text not null,
  role text not null,
  start_date date,
  end_date date,
  description text,
  is_current boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EDUCATIONS
create table public.educations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  school text not null,
  degree text not null,
  year text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DOCUMENTS
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  type text check (type in ('cv', 'cover_letter')) not null,
  template_id text,
  content jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRANSACTIONS
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  amount int not null,
  type text check (type in ('deposit', 'usage')) not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.profiles enable row level security;
alter table public.experiences enable row level security;
alter table public.educations enable row level security;
alter table public.documents enable row level security;
alter table public.transactions enable row level security;

-- Profiles: Users can view/edit their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Experiences: Users can CRUD their own experiences
create policy "Users can view own experiences" on public.experiences
  for select using (auth.uid() = user_id);
create policy "Users can insert own experiences" on public.experiences
  for insert with check (auth.uid() = user_id);
create policy "Users can update own experiences" on public.experiences
  for update using (auth.uid() = user_id);
create policy "Users can delete own experiences" on public.experiences
  for delete using (auth.uid() = user_id);

-- Educations: Users can CRUD their own educations
create policy "Users can view own educations" on public.educations
  for select using (auth.uid() = user_id);
create policy "Users can insert own educations" on public.educations
  for insert with check (auth.uid() = user_id);
create policy "Users can update own educations" on public.educations
  for update using (auth.uid() = user_id);
create policy "Users can delete own educations" on public.educations
  for delete using (auth.uid() = user_id);

-- Documents: Users can CRUD their own documents
create policy "Users can view own documents" on public.documents
  for select using (auth.uid() = user_id);
create policy "Users can insert own documents" on public.documents
  for insert with check (auth.uid() = user_id);
create policy "Users can update own documents" on public.documents
  for update using (auth.uid() = user_id);
create policy "Users can delete own documents" on public.documents
  for delete using (auth.uid() = user_id);

-- Transactions: Users can view their own transactions
create policy "Users can view own transactions" on public.transactions
  for select using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
