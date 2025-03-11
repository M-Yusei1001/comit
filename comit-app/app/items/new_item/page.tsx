"use client";

import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4 bg-green-500">
                            <label className="mb-2 block text-sm font-medium text-gray-700">商品名</label>
                            <input type='text' placeholder='商品名' className='input' {...form.register("itemName")} />
                            <p className="mt-2 text-red-500 text-xs italic">{form.formState.errors.itemName?.message}</p>
                        </div>
                        <div>
                            <button className='btn btn-primary' type='submit'>送信</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}