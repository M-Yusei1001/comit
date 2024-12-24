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

const SetSchema = z.object({
  setName: z.string().min(1, {
    message: "セット名は1文字以上で設定してください",
  }),
  setPrice: z.coerce.number()
    .min(0, {
      message: "価格を入力してください",
    }),
  setQuantity: z.coerce.number()
    .min(1, {
      message: "1以上の数を入力してください",
    })
    .max(50, {
      message: "50以下の数を入力してください",
    }),
});

export default function Page() {
  const form = useForm<z.infer<typeof SetSchema>>({
    resolver: zodResolver(SetSchema),
    defaultValues: {
      setName: "",
      setPrice: 0,
      setQuantity: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof SetSchema>) => {
    console.log(
      `setName: ${values.setName},\n`
      + `setPrice: ${values.setPrice},\n`
      + `setQuantity: ${values.setQuantity},\n`
    );
  };

  return (
    <div className="my-4">
      <div className="max-w-lg mx-auto">
        <div className="w-4/5 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="setName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="my-2 text-xl font-semibold">商品セット名</FormLabel>
                    <FormControl>
                      <Input placeholder="商品セット名を入力" {...field}></Input>
                    </FormControl>
                    <FormDescription>1文字以上30文字以内</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="setPrice"
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
                name="setQuantity"
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
