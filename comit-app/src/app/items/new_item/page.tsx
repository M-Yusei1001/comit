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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ItemSchema = z.object({
  itemImage: z.custom<FileList>()
    .transform((itemImage) => itemImage.files[0])
    .refine((itemImage) => itemImage.size <= MAX_IMAGE_SIZE, {
      message: "5MB以下の画像を設定してください"
    })
    .optional(),
  itemName: z.string().min(1, {
    message: "商品名は1文字以上で設定してください",
  }),
  itemPrice: z.coerce.number()
    .min(0, {
      message: "価格を入力してください",
    }),
  itemQuantity: z.coerce.number()
    .min(1, {
      message: "1以上の数を入力してください",
    })
    .max(50, {
      message: "50以下の数を入力してください",
    }),
  isSetOnly: z.boolean().default(false).optional(),
});

export default function Page() {
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      itemName: "",
      itemPrice: 0,
      itemQuantity: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof ItemSchema>) => {
    console.log(
      `itemName: ${values.itemName},\n`
      + `itemPrice: ${values.itemPrice},\n`
      + `itemQuantity: ${values.itemQuantity},\n`
      + `isSetOnly: ${values.isSetOnly}`);
  };

  return (
    <div className="my-4">
      <div className="max-w-lg mx-auto">
        <div className="w-4/5 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="itemImage"
                render={() => (
                  <FormItem className="mb-4">
                    <div className="flex flex-row items-center">
                      <FormLabel className="text-xl font-semibold mr-2">商品画像</FormLabel>
                      <Badge variant={"secondary"}>任意</Badge>
                    </div>
                    <FormControl>
                      <Input id="image" type="file" accept=".jpg, .jpeg, .png, .heif, .heic" />
                    </FormControl>
                    <FormDescription>JPG形式またはPNG形式のみ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="my-2 text-xl font-semibold">商品名</FormLabel>
                    <FormControl>
                      <Input placeholder="商品名を入力" {...field}></Input>
                    </FormControl>
                    <FormDescription>1文字以上30文字以内</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemPrice"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="my-2 text-xl font-semibold">頒布価格</FormLabel>
                    <FormControl>
                      <Input placeholder="価格を入力" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="itemQuantity"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="my-2 text-xl font-semibold">個数</FormLabel>
                    <FormControl>
                      <Input placeholder="個数を入力" {...field}></Input>
                    </FormControl>
                    <FormDescription>1個以上</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSetOnly"
                render={({ field }) => (
                  <FormItem className="mb-4 flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex flex-row items-center">
                        <FormLabel className="text-xl font-semibold mr-2">セットのみ</FormLabel>
                        <Badge variant={"secondary"}>任意</Badge>
                      </div>
                      <FormDescription>セットのみに付属する商品であればチェック</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="my-2 flex flex-row items-center justify-between">
                <Button type="button" variant={"secondary"}>キャンセル</Button>
                <Button type="submit">追加</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
