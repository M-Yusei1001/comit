"use client";

import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ItemSchema = z.object({
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
            + `isSetOnly: ${values.isSetOnly}`
        );
    };

    return (
        <div className="my-4">
            <div className="max-w-lg mx-auto">
                <div className="w-4/5 mx-auto">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className={`p-2 rounded-xl ${form.formState.errors.itemName ? 'bg-red-50' : ''}`}>
                            <label className="mb-2 block text-sm font-medium text-gray-700">商品名</label>
                            <input type='text' className='input' {...form.register("itemName")} />
                            <div className="h-4 mt-2">
                                {form.formState.errors.itemName && (
                                    <p className="text-red-500 text-xs italic">{form.formState.errors.itemName?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className={`p-2 rounded-xl ${form.formState.errors.itemPrice ? 'bg-red-50' : ''}`}>
                            <label className="mb-2 block text-sm font-medium text-gray-700">価格</label>
                            <input type='text' className='input' {...form.register("itemPrice")} />
                            <div className="h-4">
                                {form.formState.errors.itemPrice && (
                                    <p className="text-red-500 text-xs italic">{form.formState.errors.itemPrice?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className={`p-2 rounded-xl ${form.formState.errors.itemQuantity ? 'bg-red-50' : ''}`}>
                            <label className="mb-2 block text-sm font-medium text-gray-700">個数</label>
                            <input type='text' className='input' {...form.register("itemQuantity")} />
                            <div className="h-4">
                                {form.formState.errors.itemQuantity && (
                                    <p className="text-red-500 text-xs italic">{form.formState.errors.itemQuantity?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className='p-2 mb-4 flex items-center justify-between'>
                            <label className="text-sm font-medium text-gray-700">セットのみで取り扱い</label>
                            <input type='checkbox' className='toggle border-gray-300 bg-gray-300 checked:bg-blue-500 checked:text-white checked:border-blue-500 " /' {...form.register("isSetOnly")} />
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