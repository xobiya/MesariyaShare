import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useUser } from '../context/UserContext';

type FormValues = {
  name: string;
  location?: string;
  bio?: string;
};

export function ProfileEditForm({ onClose }: { onClose?: () => void }) {
  const { user, updateUser } = useUser();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: { name: user?.name || '', location: user?.location || '', bio: user?.bio || '' },
  });

  useEffect(() => {
    reset({ name: user?.name || '', location: user?.location || '', bio: user?.bio || '' });
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    // If user uploaded a new avatar, it's added to avatarPreview and we include it in patch
    const patch: any = { ...data };
    if (avatarPreview) patch.avatarUrl = avatarPreview;
    await updateUser(patch);
    if (onClose) onClose();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result));
    reader.readAsDataURL(f);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarPreview} alt="avatar preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500">No Image</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Profile photo</label>
          <input type="file" accept="image/*" onChange={onFile} className="text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Full name</label>
        <Input {...register('name')} />
      </div>

      <div>
        <label className="block text-sm mb-1">Location</label>
        <Input {...register('location')} />
      </div>

      <div>
        <label className="block text-sm mb-1">Bio</label>
        <Textarea {...register('bio')} rows={4} />
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit">Save changes</Button>
        <Button variant="ghost" onClick={() => (onClose ? onClose() : undefined)}>Cancel</Button>
      </div>
    </form>
  );
}

export default ProfileEditForm;
