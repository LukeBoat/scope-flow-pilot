
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  project: z.string().min(1, { message: "Project is required" }),
  dueDate: z.date(),
  items: z.array(
    z.object({
      description: z.string().min(1, { message: "Description is required" }),
      quantity: z.coerce.number().min(1),
      rate: z.coerce.number().min(0),
    })
  ),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface InvoiceFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export function InvoiceForm({ onSubmit, onCancel }: InvoiceFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      project: "",
      dueDate: new Date(),
      items: [{ description: "Professional Services", quantity: 1, rate: 0 }],
      notes: "",
    },
  });

  // Mock client and project data
  const clients = ["Acme Inc.", "Globex Corp", "Initech", "Wayne Enterprises"];
  const projects = ["Website Redesign", "Mobile App", "Branding", "Marketing Campaign"];

  const { fields, append, remove } = form.control._formValues.items;

  // Calculate total amount
  const calculateTotal = () => {
    return form.getValues().items.reduce((total, item) => {
      return total + (item.quantity * item.rate);
    }, 0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[70vh] overflow-y-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Invoice Items</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                append({ description: "", quantity: 1, rate: 0 });
              }}
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {form.watch("items", []).map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Qty
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min={1} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name={`items.${index}.rate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Rate
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                              $
                            </span>
                            <Input {...field} type="number" min={0} step="0.01" className="pl-6" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (form.getValues().items.length > 1) {
                        remove(index);
                      }
                    }}
                    disabled={form.getValues().items.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">Total:</span> ${calculateTotal().toLocaleString()}
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter any additional notes..."
                  className="resize-none"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Invoice</Button>
        </div>
      </form>
    </Form>
  );
}
