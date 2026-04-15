-- Allow users to insert their own profile (needed for upsert fallback in getUserProfile)
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);
