import React, { ReactNode, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string; message?: string } }>().props;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { id: `success-${flash.success}` });
    } else if (flash?.message) {
      toast.success(flash.message, { id: `message-${flash.message}` });
    }
    if (flash?.error) {
      toast.error(flash.error, { id: `error-${flash.error}` });
    }
  }, [flash]);

  return (
    <SidebarProvider>
      <Head title={`${title} | Admin Browky Outdoor`} />
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-6 py-5">
          {children}
        </div>
        <Toaster position="top-right" richColors visibleToasts={3} />
      </SidebarInset>
    </SidebarProvider>
  );
}
