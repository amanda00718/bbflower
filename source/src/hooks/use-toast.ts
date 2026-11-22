import { toast } from 'sonner';

export function useToast() {
  return {
    toast: ({ title, description, variant }: { title: string; description: string; variant?: 'destructive' }) =>
      (variant === 'destructive' ? toast.error : toast.success)(title, { description })
  };
}
