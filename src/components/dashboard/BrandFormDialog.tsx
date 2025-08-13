import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateBrand, useUpdateBrand, BrandFormData } from "@/hooks/useAdminBrands";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Upload } from "lucide-react";

const brandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  logo_url: z.string().optional(),
});

interface BrandFormDialogProps {
  open: boolean;
  onClose: () => void;
  brand?: any;
}

export function BrandFormDialog({
  open,
  onClose,
  brand,
}: BrandFormDialogProps) {
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const { uploadFile, uploading } = useFileUpload();

  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      description: "",
      logo_url: "",
    },
  });

  useEffect(() => {
    if (brand) {
      form.reset({
        name: brand.name || "",
        description: brand.description || "",
        logo_url: brand.logo_url || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
        logo_url: "",
      });
    }
  }, [brand, form]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadFile(file, 'brands');
    if (url) {
      form.setValue('logo_url', url);
    }
  };

  const onSubmit = async (data: BrandFormData) => {
    try {
      if (brand) {
        await updateBrand.mutateAsync({ id: brand.id, ...data });
      } else {
        await createBrand.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {brand ? "Edit Brand" : "Add New Brand"}
          </DialogTitle>
          <DialogDescription>
            {brand ? "Update brand information" : "Create a new product brand"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Brand name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Brand description" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Brand Logo</FormLabel>
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('brand-logo-upload')?.click()}
                    disabled={uploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Logo"}
                  </Button>
                  <input
                    id="brand-logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
                {form.watch('logo_url') && (
                  <div className="mt-2">
                    <img
                      src={form.watch('logo_url')}
                      alt="Brand logo preview"
                      className="h-20 w-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createBrand.isPending || updateBrand.isPending}
              >
                {brand ? "Update" : "Create"} Brand
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}