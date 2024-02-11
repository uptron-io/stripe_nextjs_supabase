create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  paid boolean,
  url text,
  description text
);

alter table profiles
  enable row level security;

create policy "Public profiles are viewable by user." on profiles
  for select using (auth.uid() = id and paid = true);

create policy "Users can insert their own profile." on profiles
  for insert with check (false);

create policy "Users can update own profile." on profiles
  for update using (false);

create policy "Users can delete own profile." on profiles
  for delete using (false);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, paid)
  values (new.id, false);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();