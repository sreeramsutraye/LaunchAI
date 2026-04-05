-- Allow users to update their own plans (for inline editing)
create policy "Users can update own plans"
  on public.plans for update
  using (auth.uid() = user_id);

-- Allow users to delete their own plans
create policy "Users can delete own plans"
  on public.plans for delete
  using (auth.uid() = user_id);
