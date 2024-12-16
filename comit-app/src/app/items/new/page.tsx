"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const ItemSchema = z.object({
  itemName: z.string().min(2, {
    message: "商品名は2文字以上で設定してください",
  }),
  itemQuantity: z.coerce.number()
  .min(1, {
    message: "1以上の数を入力してください",
  })
  .max(50, {
    message: "50以下の数を入力してください",
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      itemName: "",
      itemQuantity: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof ItemSchema>) => {
    console.log(values.itemName, values.itemQuantity);
  };

  return (
    <div className="my-4">
      <div className="max-w-lg mx-auto">
        <div className="w-4/5 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="my-2 text-xl font-semibold">商品名</FormLabel>
                    <FormControl>
                      <Input placeholder="商品名を入力" {...field}></Input>
                    </FormControl>
                    <FormDescription>2文字以上30文字以内</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-2 text-xl font-semibold">個数</FormLabel>
                    <FormControl>
                      <Input placeholder="個数を入力" {...field}></Input>
                    </FormControl>
                    <FormDescription>1個以上</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="my-2">送信</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
