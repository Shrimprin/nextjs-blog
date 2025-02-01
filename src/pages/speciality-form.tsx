import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  postalCode: z
    .string()
    .min(1, { message: "必須項目です" })
    .regex(/^\d{7}$/, { message: "郵便番号は7桁の数字で指定してください" }),
  address: z.string().min(1, { message: "必須項目です" }),
  phoneNumber: z
    .string()
    .min(1, { message: "必須項目です" })
    .regex(/^\d{10,11}$/, {
      message: "電話番号は10桁または11桁の数字で指定してください",
    }),
  email: z
    .string()
    .min(1, { message: "必須項目です" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "メールアドレスの形式が正しくありません",
    }),
  localSpecialty: z.string().min(1, { message: "必須項目です" }),
  quantity: z
    .number({
      invalid_type_error: "数値で入力してください",
    })
    .min(1, { message: "商品の数は1以上で指定してください" }),
});
type Schema = z.infer<typeof schema>;

const SpecialtyForm: NextPage<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = handleSubmit((data: Schema) => {
    console.log(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="postalCode">郵便番号: </label>
          <input id="postalCode" {...register("postalCode")} />
          <p>{errors.postalCode?.message}</p>
        </div>
        <div>
          <label htmlFor="address">住所: </label>
          <input id="address" {...register("address")} />
          <p>{errors.address?.message}</p>
        </div>
        <div>
          <label htmlFor="phoneNumber">電話番号: </label>
          <input id="phoneNumber" {...register("phoneNumber")} />
          <p>{errors.phoneNumber?.message}</p>
        </div>
        <div>
          <label htmlFor="email">メールアドレス: </label>
          <input id="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="localSpecialty">特産品: </label>
          <input id="localSpecialty" {...register("localSpecialty")} />
          <p>{errors.localSpecialty?.message}</p>
        </div>
        <div>
          <label htmlFor="quantity">商品の数: </label>
          <input
            id="quantity"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />
          <p>{errors.quantity?.message}</p>
        </div>
        <button type="submit">送信</button>
      </form>
    </>
  );
};
export default SpecialtyForm;
