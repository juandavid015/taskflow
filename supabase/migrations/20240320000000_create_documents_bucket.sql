-- Create a new bucket for document images
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true);

-- Set up storage policies for the documents bucket
create policy "Allow authenticated users to upload files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'documents');

create policy "Allow authenticated users to read files"
on storage.objects for select
to authenticated
using (bucket_id = 'documents');

create policy "Allow authenticated users to delete their own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'documents' AND
  auth.uid() = owner
); 